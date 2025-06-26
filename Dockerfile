FROM node:22-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["sh", "-c", "npm run seed && npm run dev"]