#! /bin/bash

# exporting the environment variables
set -a
source .env
set +a

sudo -u postgres psql \
  -v db_user="$DB_USER" \
  -v db_password="$DB_PASSWORD" \
  -f src/db/init.sql