
DROP database IF EXISTS otTopTen;
CREATE database otTopTen character set UTF-8;
USE otTopTen;
CREATE TABLE topTen(id integer NOT NULL PRIMARY KEY auto increment,
                   playerName varchar(30),
                   playerScore integer(5),
                   dateEarned varchar(30));

INSERT INTO topTen(playerName, playerScore, dateEarned)VALUES("lena",500,"04/30/2019");
