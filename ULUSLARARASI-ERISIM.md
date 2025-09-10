# 🌍 Uluslararası Erişim Rehberi

## Yapay Zeka Destekli Doküman Veri Çıkarıcı - Global Erişim

### 🎯 Amaç
Uygulamanızı dünya çapında herkesin erişebileceği şekilde yayınlamak.

## 🚀 Seçenekler

### 1. ☁️ Cloud Sunucu (Önerilen)

#### A) DigitalOcean ($5/ay)
```bash
# 1. Droplet oluştur (Ubuntu + Docker)
# 2. SSH ile bağlan
# 3. Uygulamayı çalıştır:
docker run -d -p 80:5173 -e GEMINI_API_KEY=your_key esyonel80/dokuman-veri-cikarici:latest

# Erişim: http://droplet-ip-adresi
```

#### B) AWS EC2 (Ücretsiz Tier)
```bash
# 1. EC2 instance oluştur
# 2. Security Group'ta 80 portunu aç
# 3. Docker yükle:
sudo yum update -y
sudo yum install docker -y
sudo service docker start

# 4. Uygulamayı çalıştır:
sudo docker run -d -p 80:5173 -e GEMINI_API_KEY=your_key esyonel80/dokuman-veri-cikarici:latest

# Erişim: http://ec2-public-ip
```

#### C) Google Cloud Platform
```bash
# 1. VM instance oluştur
# 2. Firewall rule ekle (80 port)
# 3. Docker yükle:
sudo apt update
sudo apt install docker.io -y

# 4. Uygulamayı çalıştır:
sudo docker run -d -p 80:5173 -e GEMINI_API_KEY=your_key esyonel80/dokuman-veri-cikarici:latest

# Erişim: http://gcp-external-ip
```

### 2. 🆓 Ücretsiz Hosting

#### A) Railway.app
1. GitHub'a kod yükle
2. Railway.app'e bağla
3. Environment variable ekle: `GEMINI_API_KEY`
4. Deploy et
5. Erişim: `https://your-app.railway.app`

#### B) Render.com
1. GitHub repository bağla
2. Web Service oluştur
3. Docker build seç
4. Environment variable ekle
5. Deploy et
6. Erişim: `https://your-app.onrender.com`

#### C) Fly.io
```bash
# 1. Fly CLI yükle
curl -L https://fly.io/install.sh | sh

# 2. Login ol
fly auth login

# 3. App oluştur
fly launch

# 4. Deploy et
fly deploy

# Erişim: https://your-app.fly.dev
```

### 3. 🏠 Ev İnterneti (Dikkatli!)

#### Router Ayarları:
1. Router admin paneline gir
2. Port Forwarding bölümü
3. Internal IP: 192.168.0.108
4. Internal Port: 5173
5. External Port: 80
6. Protocol: TCP
7. Kaydet

#### Güvenlik:
- ⚠️ **Güvenlik riski** var
- 🔒 **Firewall** kullanın
- 🔐 **Strong password** ayarlayın
- 📊 **Monitoring** yapın

#### Erişim:
```
http://143.105.167.219
```

### 4. 🚀 Geçici Test (Ngrok)

```bash
# Ngrok yükle
brew install ngrok/ngrok/ngrok

# Tunnel oluştur
ngrok http 5173

# Çıktıdaki URL'yi kullan:
# https://abc123.ngrok.io
```

## 📊 Maliyet Karşılaştırması

| Platform | Maliyet | Avantaj | Dezavantaj |
|----------|---------|---------|------------|
| DigitalOcean | $5/ay | Kolay, güvenilir | Ücretli |
| AWS EC2 | Ücretsiz/Ücretli | Güçlü, ölçeklenebilir | Karmaşık |
| Railway | Ücretsiz | Çok kolay | Sınırlı kaynak |
| Render | Ücretsiz | Otomatik SSL | Yavaş başlangıç |
| Ev İnterneti | Ücretsiz | Tam kontrol | Güvenlik riski |
| Ngrok | Ücretsiz/Ücretli | Hızlı test | Geçici |

## 🎯 Önerilen Yol

### Başlangıç için:
1. **Railway.app** - Ücretsiz, kolay
2. **Render.com** - Ücretsiz, SSL dahil

### Profesyonel için:
1. **DigitalOcean** - $5/ay, güvenilir
2. **AWS EC2** - Ölçeklenebilir

### Test için:
1. **Ngrok** - Hızlı, geçici

## 🔧 Kurulum Scripti

```bash
#!/bin/bash
# Sunucu kurulum scripti

echo "🌍 Uluslararası Erişim Kurulumu"
echo "=============================="

# API anahtarını al
read -p "Gemini API Anahtarınız: " API_KEY

# Docker yükle (Ubuntu)
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

# Uygulamayı çalıştır
sudo docker run -d \
    -p 80:5173 \
    -e GEMINI_API_KEY=$API_KEY \
    --name dokuman-app \
    --restart unless-stopped \
    esyonel80/dokuman-veri-cikarici:latest

echo "✅ Kurulum tamamlandı!"
echo "🌐 Erişim: http://$(curl -s ifconfig.me)"
```

## 🛡️ Güvenlik Önerileri

1. **HTTPS kullanın** (SSL sertifikası)
2. **Firewall** ayarlayın
3. **Rate limiting** ekleyin
4. **Monitoring** yapın
5. **Backup** alın
6. **Update** yapın

---

**🎉 Artık dünyanın her yerinden erişilebilir!**