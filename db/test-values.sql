SOURCE C:\Users\lucas\Desktop\dev\myFollowApp\db\create-db.sql

INSERT INTO user(email, pwd, nick) VALUES
('lucas@teste.com', 'sdajsdfpoa', '@caracol'),
('cleide@teste.com', 'sadkapsdk', '@tela'),
('bertola@teste.com', 'oasjpafksd', '@arco');

INSERT INTO follow(fk_user_followed, fk_user_follower) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 3);

-- return followed users and your followers
SELECT seguido.nick, seguidor.nick 
FROM user as seguido INNER JOIN follow 
ON follow.fk_user_followed = seguido.id
INNER JOIN user AS seguidor 
ON follow.fk_user_follower = seguidor.id 
WHERE seguido.id = 1;