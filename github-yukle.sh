#!/bin/bash

echo "📤 GitHub'a Yükleme Scripti"
echo "=========================="

# Kullanıcıdan GitHub URL'sini al
read -p "GitHub repository URL'nizi girin (örn: https://github.com/username/dokuman-veri-cikarici.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Repository URL gerekli!"
    exit 1
fi

echo "🔗 Remote ekleniyor..."
git remote add origin $REPO_URL

echo "📤 GitHub'a yükleniyor..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Başarılı! Kod GitHub'a yüklendi."
    echo ""
    echo "🚂 Şimdi Railway.app adımları:"
    echo "1. https://railway.app adresine git"
    echo "2. 'Start a New Project' tıkla"
    echo "3. 'Deploy from GitHub repo' seç"
    echo "4. Repository'ni seç: dokuman-veri-cikarici"
    echo "5. Environment variable ekle:"
    echo "   Key: GEMINI_API_KEY"
    echo "   Value: AIzaSyC4tmg3Z09rYF2oVeCEGa0Ivqxdy7WRymc"
    echo "6. Deploy et!"
else
    echo "❌ Hata oluştu!"
fi