#! /bin/bash

# exporting the environment variables
set -a
source .env
set +a

sudo -u postgres psql \
  -v db_user="$DB_USER" \
  -v db_password="$DB_PASSWORD" \
  -v db_name="$DB_NAME" \
  -v db_port="$DB_PORT" \
  -v db_host="$DB_HOST" \
  -f src/db/init.sql