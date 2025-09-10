#!/bin/bash

echo "🌐 Sunucu Kurulum Script'i"
echo "========================="

# Kullanıcıdan API anahtarını al
read -p "Gemini API Anahtarınızı girin: " API_KEY

if [ -z "$API_KEY" ]; then
    echo "❌ API anahtarı gerekli!"
    exit 1
fi

echo "🚀 Docker container başlatılıyor..."

# Eski container'ı durdur ve sil
docker stop dokuman-app 2>/dev/null
docker rm dokuman-app 2>/dev/null

# Yeni container başlat (80 portunda)
docker run -d \
    -p 80:5173 \
    -e GEMINI_API_KEY=$API_KEY \
    --name dokuman-app \
    --restart unless-stopped \
    esyonel80/dokuman-veri-cikarici:latest

if [ $? -eq 0 ]; then
    echo "✅ Başarılı! Uygulama çalışıyor."
    echo ""
    echo "🌐 Erişim Adresleri:"
    echo "   Yerel: http://localhost"
    echo "   IP ile: http://$(curl -s ifconfig.me)"
    echo ""
    echo "📊 Container durumu:"
    docker ps | grep dokuman-app
else
    echo "❌ Hata oluştu!"
fi