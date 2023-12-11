#!/bin/bash
# Abre terminal interativo para o sistema de banco
# de dados relacional mysql. Utiliza variáveis de
# ambiente do .env
export $(cat .env | xargs);
mysql \
  --host=$MYSQL_SERVER_IP_OR_HOSTNAME \
  --database=$MYSQL_DB_NAME \
  --user=$MYSQL_DB_USER \
  --password=$MYSQL_DB_PASSWORD;

