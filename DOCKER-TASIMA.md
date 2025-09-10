# Docker ile Uygulama Taşıma Rehberi

## Yöntem 1: Docker Image Dosyası ile Taşıma

### Kaynak Bilgisayarda:
```bash
# 1. Image'ı build edin
./deploy.sh build

# 2. Image'ı dosya olarak kaydedin
./deploy.sh save

# 3. dokuman-veri-cikarici.tar dosyasını hedef bilgisayara kopyalayın
```

### Hedef Bilgisayarda:
```bash
# 1. Docker yüklü olduğundan emin olun
# 2. Tar dosyasını yükleyin
docker load -i dokuman-veri-cikarici.tar

# 3. Uygulamayı çalıştırın
docker run -p 5173:5173 -e GEMINI_API_KEY=your_api_key dokuman-veri-cikarici:latest
```

## Yöntem 2: Docker Hub ile Paylaşım

### Kaynak Bilgisayarda:
```bash
# 1. Docker Hub hesabı oluşturun
# 2. Login yapın
docker login

# 3. Image'ı tag'leyin ve push edin
docker tag dokuman-veri-cikarici:latest yourusername/dokuman-veri-cikarici:latest
docker push yourusername/dokuman-veri-cikarici:latest
```

### Hedef Bilgisayarda:
```bash
# Image'ı çekin ve çalıştırın
docker run -p 5173:5173 -e GEMINI_API_KEY=your_api_key yourusername/dokuman-veri-cikarici:latest
```

## Yöntem 3: Tüm Proje Dosyalarını Taşıma

### Kaynak Bilgisayarda:
```bash
# Proje klasörünü zip'leyin (node_modules hariç)
tar -czf dokuman-app.tar.gz --exclude=node_modules --exclude=.git .
```

### Hedef Bilgisayarda:
```bash
# 1. Dosyaları açın
tar -xzf dokuman-app.tar.gz

# 2. Docker Compose ile çalıştırın
export GEMINI_API_KEY=your_api_key
docker-compose up --build
```

## Production Deployment

### Nginx ile Production:
```bash
# Production versiyonunu çalıştır
export GEMINI_API_KEY=your_api_key
docker-compose --profile production up -d
```

## Kolay Kullanım Scriptleri

### Build ve Çalıştır:
```bash
./deploy.sh build
./deploy.sh run YOUR_API_KEY
```

### Durdur:
```bash
./deploy.sh stop
```

## Avantajlar

✅ **Taşınabilirlik**: Herhangi bir Docker destekli sistemde çalışır
✅ **Tutarlılık**: Aynı ortam her yerde
✅ **Kolay Kurulum**: Tek komutla çalışır
✅ **İzolasyon**: Sistem bağımlılıklarından bağımsız
✅ **Ölçeklenebilirlik**: Kolayca çoğaltılabilir

## Gereksinimler

- Docker (20.10+)
- Docker Compose (v2.0+)
- Gemini API Anahtarı

## Sorun Giderme

### Port Çakışması:
```bash
# Farklı port kullanın
docker run -p 3000:5173 -e GEMINI_API_KEY=your_api_key dokuman-veri-cikarici:latest
```

### Image Boyutu:
```bash
# Image boyutunu kontrol edin
docker images dokuman-veri-cikarici:latest
```

### Logları Görüntüleme:
```bash
docker logs dokuman-app
```