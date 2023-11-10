# build do container servidor
# criado em: 6/11/2023
# última atualização em: 10/11/2023

FROM node:20-alpine3.17
WORKDIR /usr/src/servidor
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT npm start

