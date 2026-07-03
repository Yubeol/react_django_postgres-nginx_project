# Node.js 22 Alpine 이미지 사용
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# 빌드는 docker-compose의 command에서 실행 (npm run build && cp -r dist/. /dist)