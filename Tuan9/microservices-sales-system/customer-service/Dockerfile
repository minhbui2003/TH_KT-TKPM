FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8003
CMD ["node", "src/index.js"]