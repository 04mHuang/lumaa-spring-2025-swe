#! /bin/bash

# exporting the environment variables
set -a
source .env
set +a

sudo -u postgres psql \
  -v db_user="$DB_USER" \
  -v db_password="$DB_PASSWORD" \
  -v db_name="$DB_NAME" \
  -f src/db/init.sql