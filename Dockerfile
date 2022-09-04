FROM arm32v7/node:14.17.6
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 5000
EXPOSE 8080