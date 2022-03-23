-- SQLite
--
-- --------------------------------------------------------
--
-- Structure de la table `categories`
--
DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
    id_category INTEGER  PRIMARY KEY AUTOINCREMENT,
    id_question INTEGER,
    id_quizz INTEGER ,
    name varchar(255) NOT NULL
);
INSERT INTO categories (name) 
VALUES ('cine'),
       ('sport'),
       ('cultureG');
    
-- --------------------------------------------------------
--
-- Structure de la table `questions`
--
DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions (
    id_question INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_category INTEGER,
    question varchar(255) NOT NULL,
    id_quizz INTEGER,
  FOREIGN KEY (id_quizz) REFERENCES quizz (id_quizz) ON DELETE CASCADE  
  FOREIGN KEY (id_category) REFERENCES categories (id_category) ON DELETE CASCADE
);
-- --------------------------------------------------------
--
-- Structure de la table `quizz`
--
DROP TABLE IF EXISTS quizz;
CREATE TABLE IF NOT EXISTS quizz (
    id_quizz INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_question INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    name INTEGER NOT NULL
);
-- --------------------------------------------------------
--
-- Structure de la table `responses`
--
DROP TABLE IF EXISTS responses;
CREATE TABLE IF NOT EXISTS responses (
    id_response INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_question INTEGER ,
    response_True varchar(255) NOT NULL,
    response_2 varchar(255) NOT NULL,
    response_3 varchar(255) NOT NULL,
    response_4 varchar(255) NOT NULL,
    FOREIGN KEY (id_question) REFERENCES questions (id_question) ON DELETE CASCADE  
    
);
-- --------------------------------------------------------
--
-- Structure de la table `stat_users`
--
DROP TABLE IF EXISTS stat_users;
CREATE TABLE IF NOT EXISTS stat_users (
    id_stat INTEGER NOT NULL PRIMARY KEY,
    id_user INTEGER ,
    id_category INTEGER,
    score INTEGER,
    id_quizz INTEGER 
    FOREIGN KEY (id_user) REFERENCES user (id_user) ON DELETE CASCADE
);
-- --------------------------------------------------------
--
-- Structure de la table `users`
--
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id_user INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username INTEGER NOT NULL,
    email varchar(200) NOT NULL,
    password varchar(255) NOT NULL
);
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;