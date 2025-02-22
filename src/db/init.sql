-- suppress extraneous printouts from statement executions
\set QUIET on
-- stop script if error or exception raised
\set ON_ERROR_STOP 1 

-- set the custom current_setting configuration parameters
SET app.db_user = :'db_user';
SET app.db_password = :'db_password';
SET app.db_name = :'db_name';

DO $$
DECLARE
    db_user text = current_setting('app.db_user');
    db_password text = current_setting('app.db_password');
    db_name text = current_setting('app.db_name');
BEGIN
    -- create user with database creation permissions if user doesn't exist
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename=db_user) THEN
        EXECUTE format('CREATE USER %I WITH PASSWORD %L', db_user, db_password);
        EXECUTE format('ALTER USER %I WITH CREATEDB', db_user);
        RAISE NOTICE 'User % created', db_user;
    ELSE 
        RAISE NOTICE 'User % already exists', db_user;
    END IF;
    -- stop script if database already exists
    IF EXISTS (SELECT FROM pg_catalog.pg_database WHERE datname=db_name) THEN
        RAISE NOTICE 'Database % already exists', db_name;
        RAISE EXCEPTION 'If attempting to reinitialize database % owned by %, drop the database first.', db_name, db_user;
    END IF;
END $$;

-- create database and tables
CREATE DATABASE :db_name WITH OWNER :db_user;
SELECT 'Database ' || :'db_name' || ' created' AS notice;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username TEXT UNIQUE NOT NULL,
password  TEXT NOT NULL
);
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    isComplete BOOLEAN NOT NULL DEFAULT FALSE,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);

\set QUIET off