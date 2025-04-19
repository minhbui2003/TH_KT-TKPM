FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8006
CMD ["node", "src/index.js"]