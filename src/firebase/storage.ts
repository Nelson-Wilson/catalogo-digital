import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';

// Compresses an image file client-side to save bandwidth and storage space.
export function compressImage(file: File, maxDimension: number = 1000, quality: number = 0.75): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height *= maxDimension / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export const uploadProductImage = (
  file: File,
  productId: string,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Compress image first
      const compressedBlob = await compressImage(file);
      
      if (isFirebaseConfigured && storage) {
        // 2. Real Firebase Storage upload
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const storageRef = ref(storage, `products/${productId}/${fileName}`);
        
        const uploadTask = uploadBytesResumable(storageRef, compressedBlob);
        
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(Math.round(progress));
          },
          (error) => {
            console.error('Firebase storage upload failed:', error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      } else {
        // 3. Fallback Base64 compression & slow progress simulation for incredible preview fidelity
        let simulatedProgress = 0;
        const interval = setInterval(() => {
          simulatedProgress += 15;
          if (simulatedProgress >= 100) {
            simulatedProgress = 100;
            clearInterval(interval);
          }
          onProgress(simulatedProgress);
        }, 150);

        const reader = new FileReader();
        reader.readAsDataURL(compressedBlob);
        reader.onloadend = () => {
          setTimeout(() => {
            resolve(reader.result as string);
          }, 1100);
        };
        reader.onerror = (err) => {
          clearInterval(interval);
          reject(err);
        };
      }
    } catch (err) {
      console.error('Image processing failed:', err);
      reject(err);
    }
  });
};
