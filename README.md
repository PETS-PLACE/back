# PETS PLACE FRONT-END

Servidor de recursos à aplicação PETS PLACE

## Time de desenvolvimento

<ul>
    <li> Luiz Paulo de Lima Araújo </li>
    <li> José Edson da Silva Galdino </li>
    <li> Mateus Alexandre Barros </li>
    <li> Thales Adriel Soares de Araújo </li>
    <li> Pedro Henrique Dias Xavier </li>
    <li> Samuel Rodrigues da Silveira Neto </li>
</u>

## INSTALAÇÃO

```bash

$ npm install

```

## EXECUÇÃO DO PROJETO

```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## TESTES

```bash

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

```

## DOCKER

Composição de três serviços docker: mysql, phpmyadmin e node/alpine.
Ao utilizar o phpmyadmin certifique-se de obter o
ip do container mysql em execução em tua máquina.

```bash

# Construir imagem do servidor
$ docker compose build

# Iniciar todos os containeres/serviços
$ docker compose up

# Iniciar um específico:
$ docker compose up servidor

# Para mais detalhes leia a
# pequena documentação do
# docker compose ao executar:
$ docker compose --help

```

## LINCENÇA

  Pets Place é [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
