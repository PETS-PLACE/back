# build do container servidor
# criado em: 6/11/2023
# última atualização em: 6/11/2023

FROM node:latest
WORKDIR /usr/src/servidor
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT npm start

