source D:\dev\projects\follow-app\db\create-db.sql

DROP USER 'followappuser'@'localhost';

CREATE USER 'followappuser'@'localhost' IDENTIFIED BY 'urubu100';

GRANT SELECT, INSERT, UPDATE, DELETE ON followapp.* TO 'followappuser'@'localhost';

-- GRANT INSERT PRIVILEGES ON followapp.* TO 'followappuser'@'localhost';

-- GRANT UPDATE PRIVILEGES ON followapp.* TO 'followappuser'@'localhost';

FLUSH PRIVILEGES;