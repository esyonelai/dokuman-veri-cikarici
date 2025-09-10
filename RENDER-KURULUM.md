# 🎨 Render.com ile Ücretsiz Deployment

## Neden Render.com?
- ✅ Daha güvenilir
- ✅ Kolay kurulum
- ✅ Otomatik SSL
- ✅ 7/24 çalışır
- ✅ Railway'den daha stabil

## Adım Adım Kurulum

### 1. Render.com'a Git
- **URL:** https://render.com
- **"Get Started for Free"** tıkla
- **GitHub ile kayıt ol**

### 2. Yeni Web Service Oluştur
- Dashboard'da **"New +"** tıkla
- **"Web Service"** seç
- **"Build and deploy from a Git repository"** seç

### 3. Repository Bağla
- **"Connect GitHub"** tıkla
- **"esyonelai/dokuman-veri-cikarici"** repository'sini seç
- **"Connect"** tıkla

### 4. Ayarları Yap
- **Name:** `dokuman-veri-cikarici`
- **Environment:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npx serve -s dist -l $PORT`
- **Plan:** `Free` (0$/month)

### 5. Environment Variables Ekle
- **"Advanced"** bölümünü aç
- **"Add Environment Variable"** tıkla
- **Key:** `GEMINI_API_KEY`
- **Value:** `AIzaSyC4tmg3Z09rYF2oVeCEGa0Ivqxdy7WRymc`

### 6. Deploy Et
- **"Create Web Service"** tıkla
- **Build süreci başlayacak** (5-10 dakika)
- **URL otomatik oluşturulacak**

## 🎯 Beklenen Sonuç

- **URL:** `https://dokuman-veri-cikarici.onrender.com`
- **Build süresi:** 5-10 dakika
- **Otomatik SSL:** ✅
- **7/24 çalışır:** ✅

## 🔧 Sorun Giderme

### Build hatası:
- **Logs** sekmesini kontrol et
- **Environment variables** doğru mu?

### Yavaş başlangıç:
- Ücretsiz plan 30 saniye sonra uyur
- İlk erişim 10-30 saniye sürebilir

---

**🎉 Render.com Railway'den çok daha güvenilir!**