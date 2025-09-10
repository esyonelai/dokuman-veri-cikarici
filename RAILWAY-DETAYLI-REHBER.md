# 🚂 Railway.app Detaylı Deployment Rehberi

## Adım 1: Railway.app'e Kayıt Olma

### 1.1 Siteye Git
- **URL:** https://railway.app
- Tarayıcınızda açın

### 1.2 Kayıt Ol
- **"Sign Up"** butonuna tıklayın
- **GitHub ile kayıt olun** (önerilen)
- Veya email ile kayıt olabilirsiniz

### 1.3 GitHub Bağlantısı
- GitHub hesabınızla giriş yapın
- Railway'in GitHub'a erişim izni verin

## Adım 2: Yeni Proje Oluşturma

### 2.1 Dashboard'a Git
- Giriş yaptıktan sonra ana sayfada olacaksınız
- **"New Project"** veya **"Start a New Project"** butonunu arayın

### 2.2 Deployment Türü Seç
- **"Deploy from GitHub repo"** seçeneğini tıklayın
- Diğer seçenekler: "Empty Project", "Template" vs. - bunları seçmeyin

### 2.3 Repository Seç
- GitHub repository'leriniz listelenecek
- **"esyonelai/dokuman-veri-cikarici"** repository'sini bulun
- Üzerine tıklayın

## Adım 3: Environment Variables (Çevre Değişkenleri)

### 3.1 Variables Sekmesi
- Proje oluşturulduktan sonra proje sayfasında olacaksınız
- Sol menüde **"Variables"** sekmesini bulun ve tıklayın
- Alternatif: Üst menüde **"Settings"** > **"Environment"** olabilir

### 3.2 Yeni Variable Ekle
- **"New Variable"** veya **"Add Variable"** butonuna tıklayın
- **Key (Anahtar):** `GEMINI_API_KEY`
- **Value (Değer):** `AIzaSyC4tmg3Z09rYF2oVeCEGa0Ivqxdy7WRymc`
- **"Add"** veya **"Save"** butonuna tıklayın

### 3.3 Doğrulama
- Variable'ın eklendiğini kontrol edin
- Key: GEMINI_API_KEY
- Value: AIza... (gizli gösterilir)

## Adım 4: Deployment Başlatma

### 4.1 Deploy Butonu
- Ana proje sayfasında **"Deploy"** butonunu arayın
- Veya otomatik deployment başlamış olabilir

### 4.2 Build Süreci
- **Build logs** açılacak
- Şu adımları göreceksiniz:
  ```
  ✅ Cloning repository...
  ✅ Installing dependencies...
  ✅ Building application...
  ✅ Starting server...
  ```

### 4.3 Build Süresi
- İlk build 3-5 dakika sürebilir
- Sabırla bekleyin

## Adım 5: Domain ve URL Alma

### 5.1 Deployment Tamamlandı
- Build başarılı olduğunda **"Deployed"** yazısı görünecek
- Yeşil ✅ işareti göreceksiniz

### 5.2 URL Alma
- **"Settings"** > **"Domains"** bölümüne gidin
- **"Generate Domain"** butonuna tıklayın
- Otomatik bir URL oluşturulacak
- Örnek: `https://dokuman-veri-cikarici-production-abc123.up.railway.app`

### 5.3 Custom Domain (İsteğe Bağlı)
- Kendi domain'iniz varsa buradan ekleyebilirsiniz
- Ücretsiz plan için gerekli değil

## Adım 6: Test ve Doğrulama

### 6.1 URL'yi Aç
- Oluşturulan URL'yi yeni sekmede açın
- Uygulamanızın açıldığını kontrol edin

### 6.2 Fonksiyon Testi
- Bir dosya yüklemeyi deneyin
- API'nin çalıştığını kontrol edin

## 🔍 Sorun Giderme

### Build Hatası
**Semptom:** Build failed, red ❌
**Çözüm:**
1. Logs'u kontrol edin
2. package.json'da hata var mı bakın
3. Environment variable doğru mu kontrol edin

### Environment Variable Bulamıyorum
**Lokasyonlar:**
- Sol menü: **"Variables"**
- Üst menü: **"Settings"** > **"Environment"**
- Proje sayfası: **"Environment"** tab'ı

### Deploy Butonu Yok
**Çözüm:**
- Otomatik deployment başlamış olabilir
- **"Deployments"** sekmesine bakın
- GitHub'da değişiklik yapın (otomatik deploy tetiklenir)

### URL Çalışmıyor
**Kontrol Listesi:**
1. Build başarılı mı? (✅ yeşil işaret)
2. Environment variable ekli mi?
3. Port ayarları doğru mu? (Railway otomatik halleder)

## 📱 Mobil Erişim

- Oluşturulan URL mobil cihazlardan da açılır
- Responsive tasarım sayesinde telefon/tablet uyumlu

## 💰 Maliyet

- **Ücretsiz Plan:** Aylık 500 saat (7/24 çalışır)
- **Ücretli Plan:** $5/ay (sınırsız)
- Çoğu kullanım için ücretsiz plan yeterli

## 🔄 Otomatik Deployment

- GitHub'da kod değiştirdiğinizde otomatik deploy olur
- Yeni commit = Yeni deployment
- Rollback özelliği var

---

**🎉 Tebrikler! Uygulamanız artık dünya çapında erişilebilir!**