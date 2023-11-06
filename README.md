# PROIECTVS INTEGRATORIS - PARS I

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

composição composta por: mysql, phpmyadmin e node.
Ao utilizar o phpmyadmin certifique-se de obter o
ip do container mysql em execução em tua máquina.

```bash
# iniciar todos os containeres [não testado!]
$ docker compose up

# construir container back [testado]
$ docker build -t 'node/petsplace:1.0' .
```

## LINCENÇA

  Pets Place é [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
