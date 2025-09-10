# 🌍 Dünya Çapında Kullanım Rehberi

## Yapay Zeka Destekli Doküman Veri Çıkarıcı

Bu uygulama artık Docker Hub'da yayınlandı ve dünyanın her yerinden erişilebilir!

### 🚀 Hızlı Başlangıç

```bash
# Tek komut ile çalıştır
docker run -p 5173:5173 -e GEMINI_API_KEY=your_api_key esyonel80/dokuman-veri-cikarici:latest
```

### 📋 Gereksinimler

1. **Docker** yüklü olmalı
2. **İnternet bağlantısı** (ilk indirme için)
3. **Gemini API Anahtarı** ([buradan alın](https://makersuite.google.com/app/apikey))

### 🖥️ Desteklenen Platformlar

- ✅ Windows (Docker Desktop)
- ✅ macOS (Docker Desktop)
- ✅ Linux (Ubuntu, CentOS, Debian, vb.)
- ✅ Cloud Sunucular (AWS, GCP, Azure)
- ✅ VPS Sunucular
- ✅ Raspberry Pi

### 🌐 Farklı Kullanım Senaryoları

#### Yerel Bilgisayar:
```bash
docker run -p 5173:5173 -e GEMINI_API_KEY=AIza... esyonel80/dokuman-veri-cikarici:latest
# Erişim: http://localhost:5173
```

#### Sunucu (80 portu):
```bash
docker run -p 80:5173 -e GEMINI_API_KEY=AIza... esyonel80/dokuman-veri-cikarici:latest
# Erişim: http://sunucu-ip-adresi
```

#### Arka planda çalıştır:
```bash
docker run -d -p 5173:5173 -e GEMINI_API_KEY=AIza... --name dokuman-app esyonel80/dokuman-veri-cikarici:latest
```

#### Farklı port:
```bash
docker run -p 3000:5173 -e GEMINI_API_KEY=AIza... esyonel80/dokuman-veri-cikarici:latest
# Erişim: http://localhost:3000
```

### 🔧 Yönetim Komutları

```bash
# Çalışan container'ları görüntüle
docker ps

# Container'ı durdur
docker stop dokuman-app

# Container'ı sil
docker rm dokuman-app

# Image'ı güncelle
docker pull esyonel80/dokuman-veri-cikarici:latest
```

### 🌍 Global Erişim

**Docker Hub:** https://hub.docker.com/r/esyonel80/dokuman-veri-cikarici

**Repository:** `esyonel80/dokuman-veri-cikarici:latest`

### 📊 Özellikler

- 📄 PDF, Word, Excel dosyalarından veri çıkarma
- 🎯 Şablon oluşturma ve yönetimi
- 📊 Excel formatında dışa aktarma
- 🇹🇷 Türkçe arayüz
- 🤖 Google Gemini AI entegrasyonu

### 🆘 Sorun Giderme

#### Port çakışması:
```bash
docker run -p 8080:5173 -e GEMINI_API_KEY=... esyonel80/dokuman-veri-cikarici:latest
```

#### API anahtarı hatası:
- Gemini API anahtarınızın geçerli olduğundan emin olun
- [Google AI Studio](https://makersuite.google.com/app/apikey)'dan yeni anahtar alın

#### Container çalışmıyor:
```bash
# Logları kontrol et
docker logs container-name

# Yeniden başlat
docker restart container-name
```

### 💡 İpuçları

- İlk çalıştırmada image indirilir (~100MB)
- Sonraki çalıştırmalar çok hızlıdır
- API anahtarını güvenli tutun
- Farklı portlar kullanarak birden fazla instance çalıştırabilirsiniz

---

**🎉 Artık dünyanın her yerinden kullanılabilir!**