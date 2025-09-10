# Node.js base image
FROM node:18-alpine

# Çalışma dizini
WORKDIR /app

# Package dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodunu kopyala
COPY . .

# Port
EXPOSE 5173

# Uygulamayı başlat
CMD ["npm", "run", "dev", "--", "--host"]