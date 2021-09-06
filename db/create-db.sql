DROP DATABASE followapp;
CREATE DATABASE followapp;
USE followapp;

CREATE TABLE user(
    id INT PRIMARY KEY auto_increment,
    email VARCHAR(45) NOT NULL UNIQUE,
    pwd VARCHAR(45) NOT NULL,
    nick VARCHAR(45) NOT NULL UNIQUE
) auto_increment = 100;

-- DESC user;

CREATE TABLE follow(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_user_followed INT NOT NULL,
    fk_user_follower INT NOT NULL,
    FOREIGN KEY(fk_user_followed) REFERENCES user(id),
    FOREIGN KEY(fk_user_follower) REFERENCES user(id)
) auto_increment = 100;

-- DESC follow;

CREATE TABLE post(
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT(300),
    date_time DATETIME NOT NULL,
    tags VARCHAR(200),
    fk_user INT NOT NULL,
    FOREIGN KEY (fk_user) REFERENCES user(id)
) auto_increment = 100;

-- DESC post;

CREATE TABLE likes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_user INT NOT NULL,
    fk_post INT NOT NULL,
    FOREIGN KEY (fk_user) REFERENCES user(id),
    FOREIGN KEY (fk_post) REFERENCES post(id)
) auto_increment = 100;

-- DESC likes;

CREATE TABLE comments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT(300) NOT NULL,
    date_time DATETIME NOT NULL,
    fk_post INT NOT NULL,
    fk_user INT NOT NULL,
    FOREIGN KEY (fk_post) REFERENCES post(id),
    FOREIGN KEY (fk_user) REFERENCES user(id)
) auto_increment = 100;

-- DESC comments;