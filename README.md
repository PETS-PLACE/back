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

## DOCUMENTAÇÃO DOS END-POINTS
Última atualização: 03/01/2023

``` Informações únicas para cada usuário: nome, cpf, email
    (!) alertas de segurança ou desempenho.
    (A) autenticação necessária.

/clients
    /clients, POST {nome,cpf,rua,numero,bairro,cidade,estado,email,password}
    /clients, GET - retorna todos os clientes registrados (!)(A)
    /clients/:id, GET - retona cliente pelo seu id (A)
    /clients/:id, PATCH - PartialType de POST (A)
    /clients/:id, DELETE - deleta cliente pelo seu id (A)

/animais
    /animais, POST {cliente.nome,nome,especie,idade,peso}(A)
    /animais, GET - retorna todos os animais registrados (A)
    /animais/:id, GET - Não implementado (A)
    /animais/:id, PATCH - PartialType de POST (A)
    /animais/:id, DELETE - deleta animal pelo id (A)

/agendamentos
    /agendamentos, POST {cpf,observacoes?,animalId,petShopId,servicoId}
    /agendamentos, GET - retorna todos os agendamentos do cliente logado por token.

/petshop
    /petshop, POST {nome,cnpj,rua,numero,bairro,cidade,estado,email,password}
    /petshop, GET - retorna todos os petshops registrados (!)(A)
    /petshop/:id, GET - retorna petshop pelo seu id (A)
    /petshop/:id, PATCH - partialType de POST (A)
    /petshop/:id, DELETE - deleta petshop pelo id (A)

/services
    /services, POST {name,description?,cost?,petShopId}
    /services, GET - retorna todos os serviços registrados.
    /services/:id, GET - especifica pelo id.
    /services/:id, PATCH - edita pelo id {POST dto}
    /services, DELETE - delete não especificado.

/contatos
    /contatos, GET - retorna todos os contatos registrados no sistema (!)(A)
    /contatos, POST {contato.info, petshop.nome} - novo contato (A)
    /contatos/:id, PUT {contato.info} - alterar contato (A)
    /contatos/:id, DELETE - deleta contato pelo id (A)

/autenticacao
    POST {USUARIO.email, USUARIO.senha, USUARIO.tipo} - obter autorização para acesso à rotas
        Authorization: bearer af8424bb...

```

IMPORTANTE: A diretório src/[NOMEDOMÓDULO]/dto/ no repositório
do back contém campos exigidos para que uma requisição tenha sucesso.
Cada módulo representa funcionalidades de entidades no sistema.

## REQUISITAR

Exemplo de uso do curl para teste de requisição:

```

$ curl -v \
-X PATCH \
-H 'Content-Type:application/json' \
-H 'Authorization: bearer <Token>' \
-d '{"rua":"Beco do matadouro"}' \
http://127.0.0.1:8080/petshop/2


```

## LINCENÇA

  Pets Place é [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
