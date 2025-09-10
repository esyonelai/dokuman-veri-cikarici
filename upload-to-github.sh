#!/bin/bash

echo "📤 GitHub'a Yükleme"
echo "=================="

# Remote ekle
git remote add origin https://github.com/esyonelai/dokuman-veri-cikarici.git

# Push et
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Başarılı! Kod GitHub'a yüklendi."
    echo ""
    echo "🔗 Repository: https://github.com/esyonelai/dokuman-veri-cikarici"
    echo ""
    echo "🚂 Şimdi Railway.app adımları:"
    echo "1. https://railway.app adresine git"
    echo "2. 'Start a New Project' tıkla"
    echo "3. 'Deploy from GitHub repo' seç"
    echo "4. 'esyonelai/dokuman-veri-cikarici' seç"
    echo "5. Environment Variables ekle:"
    echo "   GEMINI_API_KEY = AIzaSyC4tmg3Z09rYF2oVeCEGa0Ivqxdy7WRymc"
    echo "6. Deploy et!"
    echo ""
    echo "🌍 Sonuç: Dünya çapında erişilebilir URL alacaksınız!"
else
    echo "❌ Hata! Önce GitHub'da repository oluşturun:"
    echo "https://github.com/new"
fi