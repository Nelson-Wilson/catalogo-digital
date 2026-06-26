/**
 * Image Upload Service — Cloudinary (free tier)
 * 
 * Firebase Storage requires a paid plan (Blaze).
 * Cloudinary offers 25GB free storage + 25GB bandwidth/month.
 * 
 * SETUP (free, no credit card needed):
 *   1. Go to https://cloudinary.com and create a free account
 *   2. Dashboard → Settings → Upload → Add upload preset
 *      - Preset name: malambe_uploads
 *      - Signing Mode: Unsigned  ← important!
 *      - Folder: malambe-products
 *      - Save
 *   3. Add to .env.local:
 *      VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *      VITE_CLOUDINARY_UPLOAD_PRESET=malambe_uploads
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'malambe_uploads';
const IS_PROD = import.meta.env.PROD;
const isCloudinaryConfigured = !!CLOUD_NAME;

/**
 * Compresses an image client-side before uploading.
 */
export function compressImage(
  file: File,
  maxDimension = 1200,
  quality = 0.80
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > height) {
          if (width > maxDimension) { height = Math.round(height * maxDimension / width); width = maxDimension; }
        } else {
          if (height > maxDimension) { width = Math.round(width * maxDimension / height); height = maxDimension; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(file); return; }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(blob => resolve(blob ?? file), 'image/jpeg', quality);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

/**
 * Uploads image to Cloudinary (free) with progress reporting.
 * Falls back to base64 preview in development if Cloudinary not configured.
 */
export const uploadProductImage = (
  file: File,
  productId: string,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const compressedBlob = await compressImage(file);

      // ── Cloudinary Upload (free, no credit card) ──────────────
      if (isCloudinaryConfigured) {
        const formData = new FormData();
        formData.append('file', compressedBlob, file.name);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('folder', `malambe-products/${productId}`);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            // Use Cloudinary's auto-quality URL transformation
            const optimizedUrl = data.secure_url.replace(
              '/upload/',
              '/upload/q_auto,f_auto,w_1200/'
            );
            resolve(optimizedUrl);
          } else {
            reject(new Error(`Cloudinary upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error('Upload falhou. Verifique a sua conexão.'));
        xhr.send(formData);
        return;
      }

      // ── Dev fallback: base64 preview ──────────────────────────
      if (IS_PROD) {
        reject(new Error(
          'Cloudinary não configurado. Adicione VITE_CLOUDINARY_CLOUD_NAME ao .env.local\n' +
          'Registo gratuito em: https://cloudinary.com'
        ));
        return;
      }

      let progress = 0;
      const interval = setInterval(() => {
        progress = Math.min(progress + 20, 100);
        onProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 100);

      const reader = new FileReader();
      reader.readAsDataURL(compressedBlob);
      reader.onloadend = () => {
        setTimeout(() => resolve(reader.result as string), 600);
      };
      reader.onerror = (err) => { clearInterval(interval); reject(err); };

    } catch (err) {
      reject(err);
    }
  });
};

// Keep this export for compatibility
export { isCloudinaryConfigured as isStorageConfigured };
