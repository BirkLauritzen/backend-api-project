/* Uses the schema cafes_database so the tables are created in the right database */
USE cafes_database;

/* Drop tables if they exist to avoid errors */
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cafes;

/* Create tables */
create table cafes
(
    cafe_id      int auto_increment   not null
        primary key,
    cafe_name    varchar(100)  null,
    descriptions text          null,
    address      varchar(100)  null,
    rating       decimal(2, 1) null,
    longitude    decimal(9, 6) null,
    latitude     decimal(9, 6) null
)
    engine = InnoDB;

create table users
(
    users_id        int auto_increment
        primary key,
    firstName       varchar(100) null,
    lastName        varchar(100) null,
    email           varchar(100) not null,
    username        varchar(255) not null,
    hashed_password char(60)     not null,
    constraint username
        unique (username),
    constraint email
        unique (email)
)
    engine = InnoDB;

create table favorites
(
    favorite_id        int auto_increment
        primary key,
    cafe_id            int          null,
    favorite_cafe_name varchar(255) null,
    users_id           int          null,
    constraint favorites_ibfk_1
        foreign key (cafe_id) references cafes (cafe_id),
    constraint users_id
        foreign key (users_id) references users (users_id)
)
    engine = InnoDB;

create index cafe_id
    on favorites (cafe_id);



/* Insert data into cafes */
INSERT INTO cafes (cafe_id, cafe_name, descriptions, address, rating, longitude, latitude)
VALUES
    ('1', 'Café Europa 1989', 'this café is inspired by European café culture and has a cozy atmosphere.', 'Amagertorv 1, 1160 Copenhagen', '3.5', '12.579290', '55.678670'),
    ('2', 'Café Victor', 'this café is known for its cozy atmosphere and is a popular meeting place.', 'Ny Østergade 8, 1101 Copenhagen', '4', '12.583250', '55.680750'),
    ('3', 'Democratic Coffee', 'this café is situated inside the Copenhagen Main Library and is known for its coffee and almond croissants.', 'Krystalgade 15, 1172 Copenhagen', '4.5', '12.573650', '55.680880'),
    ('4', 'Absalon', 'this former church has been transformed into a communal space and is a good place to meet with your study group.', 'Sønder Boulevard 73, 1720 Copenhagen', '4.5', '12.550310', '55.665390'),
    ('5', 'Henckell', 'this café has beautiful interiors and large windows, perfect for people-watching when you can no longer focus.', 'Gl. Kongevej 108, 1850 Frederiksberg', '5', '12.543710', '55.676040'),
    ('6', 'Paludan Bog & Café', 'this cafe is known for its cozy atmosphere and extensive book collection', 'Fiolstræde 10, 1171 Copenhagen', '4.5', '12.573241', '55.680442'),
    ('7', 'cafe Bjerget', 'this cafe is known for its delicious coffee and homemade cakes', 'Bispebjerg Torv 8, 2400 Copenhagen', '4', '12.531878', '55.716591'),
    ('8', 'Café Retro', 'this cafe is known for its vegan food and cozy atmosphere', 'Knabrostræde 26, 1210 Copenhagen', '2.5', '12.575718', '55.676855'),
    ('9', 'Kaffeplantagen', 'this cafe is known for its great coffee and relaxed atmosphere', 'Skt. Hans Torv 3, 2200 Copenhagen', '4', '12.560347', '55.690607'),
    ('10', 'Café Dyrehaven', 'this cafe is known for its brunch and cozy atmosphere', 'Sønder Boulevard 72, 1720 Copenhagen', '4', '12.549581', '55.665790'),
    ('11', 'The Living Room', 'this cafe is known for its cozy atmosphere and great coffee', 'Larsbjørnsstræde 17, 1454 Copenhagen', '4.5', '12.568956', '55.678656'),
    ('12', 'Café Sommersko', 'this cafe is known for its cozy atmosphere and great food', 'Kronprinsensgade 6, 1114 Copenhagen', '3', '12.579108', '55.680740'),
    ('13', 'Café Katz', 'this cafe is known for its cozy atmosphere and great coffee', 'Nørrebrogade 88, 2200 Copenhagen', '4', '12.552292', '55.692415'),
    ('14', 'Café Norden', 'this cafe is known for its great coffee and cozy atmosphere', 'Østergade 61, 1100 Copenhagen', '2.5', '12.580186', '55.678973'),
    ('15', 'Studenterhuset', NULL, 'Købmagergade 52, 1150 Copenhagen', '4', '12.576420', '55.681489'),
    ('16', 'Riccos', NULL, 'Istedgade 119, 1650 Copenhagen', '3', '12.548264', '55.667615');

/* Insert data into users */
INSERT INTO users (users_id, firstName, lastName, email, username, hashed_password) VALUES
                                                                                 (1, 'John', 'Doe', 'john.doe@example.com', 'johndoe', 'hashedpassword1'),
                                                                                 (2, 'Alice', 'Smith', 'alice.smith@example.com', 'alicesmith', 'hashedpassword2'),
                                                                                 (3, 'Bob', 'Johnson', 'bob.johnson@example.com', 'bobjohnson', 'hashedpassword3'),
                                                                                 (4, 'Emily', 'Williams', 'emily.williams@example.com', 'emilywilliams', 'hashedpassword4'),
                                                                                 (5, 'Michael', 'Jones', 'michael.jones@example.com', 'michaeljones', 'hashedpassword5'),
                                                                                 (6, 'Sophia', 'Brown', 'sophia.brown@example.com', 'sophiabrown', 'hashedpassword6'),
                                                                                 (7, 'Daniel', 'Taylor', 'daniel.taylor@example.com', 'danieltaylor', 'hashedpassword7'),
                                                                                 (8, 'Olivia', 'Miller', 'olivia.miller@example.com', 'oliviamiller', 'hashedpassword8'),
                                                                                 (9, 'David', 'Anderson', 'david.anderson@example.com', 'davidanderson', 'hashedpassword9'),
                                                                                 (10, 'Emma', 'Davis', 'emma.davis@example.com', 'emmadavis', 'hashedpassword10');

/* Insert data into favorites */
INSERT INTO favorites (cafe_id, favorite_cafe_name, users_id) VALUES
                                                                  (6, 'Paludan Bog & Café', 6),
                                                                  (2, 'Café Victor', 2),
                                                                  (3, 'Democratic Coffee', 3),
                                                                  (7, 'cafe Bjerget', 7),
                                                                  (11, 'The Living Room', 10),
                                                                  (14, 'Café Norden', 9),
                                                                  (8, 'Café Retro', 8),
                                                                  (10, 'Café Dyrehaven', 5),
                                                                  (4, 'Absalon', 4),
                                                                  (12, 'Café Sommersko', 1);
