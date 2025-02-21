SET app.db_user = :'db_user';
SET app.db_password = :'db_password';

SELECT current_setting('app.db_user') as username;
SELECT current_setting('app.db_password') as password;

-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT * FROM pg_catalog.pg_user WHERE username=:'db_user') THEN
--         CREATE USER :'db_user' WITH PASSWORD :'db_password';
--         RAISE NOTICE 'Created user %', db_user;

-- END $$;