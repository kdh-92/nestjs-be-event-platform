FROM node:18.20.8-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "dist/main"]
