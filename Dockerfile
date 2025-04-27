FROM node:20-slim

WORKDIR /app

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npm install -g ts-node

COPY . .

RUN npm run prisma:generate
RUN npm run build

# Wait for database to be ready and run migrations
CMD sh -c "npm run prisma:migrate && npm run prisma:seed && npm start" 