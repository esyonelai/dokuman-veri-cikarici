# Yapay Zeka Destekli Doküman Veri Çıkarıcı - Kurulum Rehberi

## Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn
- Gemini API Anahtarı

## Hızlı Kurulum

### 1. Projeyi İndirin
```bash
# Git ile
git clone [repository-url]
cd yapay-zeka-destekli-doküman-veri-çıkarıcı

# Veya ZIP dosyasını indirip açın
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. API Anahtarını Ayarlayın

**Gemini API Anahtarı Alın:**
1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
2. Google hesabınızla giriş yapın
3. "Create API Key" butonuna tıklayın
4. API anahtarını kopyalayın

**Ortam Değişkenini Ayarlayın:**
```bash
# .env.local dosyası oluşturun
echo "GEMINI_API_KEY=your_actual_api_key_here" > .env.local
```

### 4. Uygulamayı Başlatın
```bash
npm run dev
```

### 5. Tarayıcıda Açın
- Genellikle: http://localhost:5173
- Terminal'de gösterilen URL'yi kullanın

## Docker ile Kurulum

### Gereksinimler
- Docker
- Docker Compose

### Kurulum
```bash
# API anahtarını ortam değişkeni olarak ayarlayın
export GEMINI_API_KEY=your_actual_api_key_here

# Docker ile çalıştırın
docker-compose up --build
```

## Production Deployment

### Build Oluşturma
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Sorun Giderme

### API Anahtarı Hatası
- API anahtarının doğru olduğundan emin olun
- .env.local dosyasının proje kök dizininde olduğunu kontrol edin
- Uygulamayı yeniden başlatın

### Port Çakışması
```bash
# Farklı port kullanın
npm run dev -- --port 3000
```

### Bağımlılık Sorunları
```bash
# Node modules'ı temizleyin
rm -rf node_modules package-lock.json
npm install
```

## Özellikler
- PDF, Word, Excel dosyalarından veri çıkarma
- Şablon oluşturma ve yönetimi
- Excel formatında dışa aktarma
- Türkçe arayüz desteği

## Destek
Sorunlar için GitHub Issues kullanın veya dokümantasyonu kontrol edin.