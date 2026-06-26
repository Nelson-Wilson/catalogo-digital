# 🔥 Guia de Configuração Firebase — Malambe & Moda

## 1. Criar Projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Criar um projeto"**
3. Nome: `malambe-e-moda` (ou similar)
4. Desative o Google Analytics (opcional)
5. Clique em **"Criar projeto"**

---

## 2. Adicionar App Web

1. No painel do projeto, clique em **"Web"** (ícone `</>`)
2. Nome do app: `Malambe & Moda Catálogo`
3. **NÃO** marque Firebase Hosting (usaremos Vercel)
4. Copie as credenciais exibidas

---

## 3. Configurar Variáveis de Ambiente

### Para desenvolvimento local:
```bash
# Crie o arquivo .env.local na raiz do projeto
cp .env.example .env.local
# Preencha com suas credenciais reais
```

### Para Vercel:
1. Acesse **vercel.com → seu-projeto → Settings → Environment Variables**
2. Adicione cada variável:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

---

## 4. Ativar Authentication

1. No Firebase Console: **Authentication → Começar**
2. Aba **"Sign-in method"** → Ativar **Email/Senha**
3. Aba **"Users"** → **"Adicionar usuário"**:
   - Email: `admin@malambeemoda.com` (ou o seu email)
   - Senha: escolha uma senha forte (mín. 12 caracteres)
4. Copie o **UID** do usuário criado (será útil para regras mais restritas)

---

## 5. Ativar Firestore

1. **Firestore Database → Criar banco de dados**
2. Escolha **"Começar no modo de produção"**
3. Localização: `europe-west1` (mais próximo de Moçambique)
4. Copie as regras do arquivo `firestore.rules` e cole em **Regras**

---

## 6. Ativar Firebase Storage

1. **Storage → Começar**
2. Localização: `europe-west1`
3. Copie as regras do arquivo `storage.rules` e cole em **Regras**

---

## 7. Deploy no Vercel

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Na pasta do projeto
npm run build
vercel --prod

# Ou via GitHub: conecte o repositório no vercel.com
```

---

## 8. Domínio Personalizado (malambeemoda.com)

1. No Vercel: **Settings → Domains → Add Domain**
2. Digite: `www.malambeemoda.com`
3. Configure o DNS no seu registrador:
   - Tipo `CNAME`, Nome `www`, Valor `cname.vercel-dns.com`
   - (Para o domínio raiz, use registros A apontando para IPs do Vercel)

---

## ✅ Checklist Final

- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Usuário admin criado no Firebase Auth
- [ ] Regras do Firestore aplicadas
- [ ] Regras do Storage aplicadas
- [ ] Domínio conectado
- [ ] Build de produção sem erros (`npm run build`)
- [ ] PWA instalável no mobile
- [ ] Login/logout funcionando
- [ ] Upload de imagens funcionando
- [ ] WhatsApp automático funcionando
