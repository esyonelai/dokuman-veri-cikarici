#!/bin/bash

# Deployment script for Docker

echo "🚀 Docker Deployment Script"
echo "=========================="

# Kullanım kontrolü
if [ "$1" = "build" ]; then
    echo "📦 Building Docker image..."
    docker build -t dokuman-veri-cikarici:latest .
    echo "✅ Build completed!"
    
elif [ "$1" = "save" ]; then
    echo "💾 Saving Docker image to file..."
    docker save -o dokuman-veri-cikarici.tar dokuman-veri-cikarici:latest
    echo "✅ Image saved as dokuman-veri-cikarici.tar"
    
elif [ "$1" = "load" ]; then
    echo "📥 Loading Docker image from file..."
    docker load -i dokuman-veri-cikarici.tar
    echo "✅ Image loaded!"
    
elif [ "$1" = "run" ]; then
    if [ -z "$2" ]; then
        echo "❌ API key required! Usage: ./deploy.sh run YOUR_API_KEY"
        exit 1
    fi
    echo "🏃 Running application..."
    docker run -d -p 5173:5173 -e GEMINI_API_KEY=$2 --name dokuman-app dokuman-veri-cikarici:latest
    echo "✅ Application running at http://localhost:5173"
    
elif [ "$1" = "stop" ]; then
    echo "🛑 Stopping application..."
    docker stop dokuman-app
    docker rm dokuman-app
    echo "✅ Application stopped!"
    
elif [ "$1" = "prod" ]; then
    if [ -z "$2" ]; then
        echo "❌ API key required! Usage: ./deploy.sh prod YOUR_API_KEY"
        exit 1
    fi
    echo "🏭 Running production version..."
    docker-compose --profile production up -d
    echo "✅ Production app running at http://localhost"
    
else
    echo "Usage:"
    echo "  ./deploy.sh build              - Build Docker image"
    echo "  ./deploy.sh save               - Save image to file"
    echo "  ./deploy.sh load               - Load image from file"
    echo "  ./deploy.sh run API_KEY        - Run development version"
    echo "  ./deploy.sh prod API_KEY       - Run production version"
    echo "  ./deploy.sh stop               - Stop application"
fi