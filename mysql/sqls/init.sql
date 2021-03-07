DTOP DATABASE IF EXISTS myapp;
-- 이전에 생성된 myapp DB가 존재할 경우 삭제
CREATE DATABASE myapp;
USE myapp;

CREATE TABLE lists(
    id INT AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
);