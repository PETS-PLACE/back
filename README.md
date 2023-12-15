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

## ROTAS
Última atualização: 14/12/2023

``` Informações únicas para cada usuário: nome, cpf, email
    (!) alertas de segurança ou desempenho.
    (A) autenticação necessária.


/clients
    /clients, POST {nome,cpf,rua,numero,bairro,cidade,estado,email,password}
    /clients, GET - retorna todos os clientes do sistema (!)(A)
    /clients/:id, GET - retona cliente pelo seu id (A)
    /clients/:id, PATCH - PartialType de POST (A)
    /clients/:id, DELETE - deleta cliente pelo seu id (A)

/petshop
    /petshop, POST {nome,cnpj,rua,numero,bairro,cidade,estado,email,password}
    /petshop, GET - retorna todos os petshops do sistema (!)(A)
    /petshop/:id, GET - retorna petshop pelo seu id (A)
    /petshop/:id, PATCH - partialType de POST (A)
    /petshop/:id, DELETE - deleta petshop pelo id (A)

/contatos
    /contatos/:nome, GET - lista de contatos do petshop com nome (!)(A)
    /contatos, POST {contato.info, petshop.nome} - novo contato (A)
    /contatos/:id, PUT {contato.info} - alterar contato (A)
    /contatos/:id, DELETE - deleta contato pelo id (A)

/autenticacao
    POST {USUARIO.nome, USUARIO.senha, tipo} - obter autorização para acesso à rotas (!)
        Authorization: bearer <base64_do_token>

```

IMPORTANTE: A diretório src/[NOMEDOMÓDULO]/dto/ no repositório
do back contém campos exigidos para que uma requisição tenha sucesso.
Cada módulo representa funcionalidades de entidades no sistema.

## LINCENÇA

  Pets Place é [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
