-- SQLite
--
-- --------------------------------------------------------
--
-- Structure de la table `categories`
--
DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
    id_category INTEGER PRIMARY KEY AUTOINCREMENT,
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
    --   FOREIGN KEY (id_quizz) REFERENCES quizz (id_quizz) ON DELETE CASCADE  
    --   FOREIGN KEY (id_category) REFERENCES categories (id_category) ON DELETE CASCADE
);
-- --------------------------------------------------------
--
-- Structure de la table `quizz`
--
DROP TABLE IF EXISTS quizz;
CREATE TABLE IF NOT EXISTS quizz (
    id_quizz INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_category INTEGER,
    name varchar(255) NOT NULL,
    id_user INTEGER NOT NULL
);
INSERT INTO quizz (id_category, name, id_user)
VALUES ('1', '1st quizz', '1'),
    ('2', '2nd quizz', '2'),
    ('3', '3rd quizz', '1');
-- --------------------------------------------------------
--
-- Structure de la table `responses`
--
DROP TABLE IF EXISTS responses;
CREATE TABLE IF NOT EXISTS responses (
    id_response INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_question INTEGER,
    response_1 varchar(255) NOT NULL,
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
    id_user INTEGER,
    id_category INTEGER,
    score INTEGER,
    number_question INTEGER ,
    id_quizz INTEGER,
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE
    FOREIGN KEY (id_category) REFERENCES categories (id_category) ON DELETE CASCADE
);
INSERT INTO stat_users (id_user, id_category, score,number_question, id_quizz)
VALUES ('1', '1', '600', '12','1'),
    ('1', '1', '900', '10','1'),
    ('1', '1', '900', '10','2'),
    ('1', '3', '1000', '10','2'),
    ('1', '2', '1000', '10','2');


-- --------------------------------------------------------
--
-- Structure de la table `users`
--
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id_user INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    username INTEGER NOT NULL,
    email varchar(200) NOT NULL, 
    password varchar(255) NOT NULL,
    bio varchar(200),
    picture varchar(250)
);
INSERT INTO users (username, email, password, bio)
VALUES ('luacs', 'lucas@lucas.fr', 'lucas', 'champion'),
    ('antho', 'antho@antho.fr', 'antho', 'not a champion'),
    ('dylan', 'dydy@dydy.fr', 'dydy', 'challenger');
