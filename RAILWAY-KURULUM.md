# 🚂 Railway.app ile Ücretsiz Deployment

## Adım Adım Kurulum

### 1. GitHub Repository Oluştur
1. [GitHub.com](https://github.com)'a git
2. "New repository" tıkla
3. Repository adı: `dokuman-veri-cikarici`
4. Public seç
5. "Create repository" tıkla

### 2. Kodu GitHub'a Yükle
```bash
# Remote ekle (GitHub'dan aldığın URL'yi kullan)
git remote add origin https://github.com/USERNAME/dokuman-veri-cikarici.git

# Push et
git branch -M main
git push -u origin main
```

### 3. Railway.app'e Git
1. [Railway.app](https://railway.app)'e git
2. "Start a New Project" tıkla
3. "Deploy from GitHub repo" seç
4. GitHub hesabını bağla
5. `dokuman-veri-cikarici` repository'sini seç

### 4. Environment Variables Ekle
Railway dashboard'da:
1. "Variables" sekmesine git
2. "New Variable" tıkla
3. **Key:** `GEMINI_API_KEY`
4. **Value:** `AIzaSyC4tmg3Z09rYF2oVeCEGa0Ivqxdy7WRymc`
5. "Add" tıkla

### 5. Deploy Et
1. "Deploy" butonuna tıkla
2. Build işlemini bekle (2-3 dakika)
3. Deploy tamamlandığında URL alacaksın

### 6. Domain Al
1. "Settings" > "Domains" git
2. "Generate Domain" tıkla
3. Örnek: `https://dokuman-veri-cikarici-production.up.railway.app`

## ✅ Sonuç

- 🆓 **Tamamen ücretsiz**
- 🌍 **Dünya çapında erişilebilir**
- 🔄 **Otomatik deployment** (kod değişikliklerinde)
- 📊 **SSL sertifikası** dahil
- ⚡ **Hızlı ve güvenilir**

## 🔧 Alternatif Komutlar

### Yerel test:
```bash
npm run dev
```

### Production build:
```bash
npm run build
```

### Docker ile test:
```bash
docker build -f Dockerfile.railway -t railway-test .
docker run -p 3000:3000 -e PORT=3000 -e GEMINI_API_KEY=your_key railway-test
```

## 🛠️ Sorun Giderme

### Build hatası:
- `package.json` dosyasını kontrol et
- Node.js versiyonunu kontrol et

### Environment variable hatası:
- Railway dashboard'da GEMINI_API_KEY'i kontrol et
- API anahtarının geçerli olduğundan emin ol

### Port hatası:
- Railway otomatik port atar
- $PORT environment variable kullanılıyor

---

**🎉 Artık uygulamanız 7/24 çalışıyor ve dünya çapında erişilebilir!**