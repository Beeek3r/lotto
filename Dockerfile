FROM node:20.14-alpine

WORKDIR /root

COPY . .

EXPOSE 3001/tcp

CMD ["npm", "run", "dev"]