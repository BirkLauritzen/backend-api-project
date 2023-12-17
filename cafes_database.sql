/* Uses the schema cafes_database so the tables are created in the right database */
USE cafes_database;

/* Get the database */
select * from cafes;
select * from users;
select * from favorites;
select * from opening_hours;

/* Drop tables if they exist to avoid errors */
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cafes;
DROP TABLE IF EXISTS opening_hours;


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
    latitude     decimal(9, 6) null,
    has_wifi     boolean
)
    engine = InnoDB;

create table users
(
    users_id        int auto_increment
        primary key,
    first_name       varchar(100) null,
    last_name        varchar(100) null,
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

CREATE TABLE opening_hours (
                               id INT auto_increment PRIMARY KEY,
                               cafe_id INT,
                               day_of_week VARCHAR(10),
                               opening_time TIME,
                               closing_time TIME,
                               FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id)
);


/* Insert data into cafes */
INSERT INTO cafes (cafe_id, cafe_name, descriptions, address, rating, longitude, latitude, has_wifi)
VALUES
    (1, 'Café Europa 1989', 'this café is inspired by European café culture and has a cozy atmosphere.', 'Amagertorv 1, 1160 Copenhagen', 3.5, 12.579290, 55.678670, true),
    (2, 'Café Victor', 'this café is known for its cozy atmosphere and is a popular meeting place.', 'Ny Østergade 8, 1101 Copenhagen', 4, 12.583250, 55.680750, true),
    (3, 'Democratic Coffee', 'this café is situated inside the Copenhagen Main Library and is known for its coffee and almond croissants.', 'Krystalgade 15, 1172 Copenhagen', 4.5, 12.573650, 55.680880, true),
    (4, 'Absalon', 'this former church has been transformed into a communal space and is a good place to meet with your study group.', 'Sønder Boulevard 73, 1720 Copenhagen', 4.5, 12.550310, 55.665390, true),
    (5, 'Henckell', 'this café has beautiful interiors and large windows, perfect for people-watching when you can no longer focus.', 'Gl. Kongevej 108, 1850 Frederiksberg', 5, 12.543710, 55.676040, true),
    (6, 'Paludan Bog & Café', 'this cafe is known for its cozy atmosphere and extensive book collection', 'Fiolstræde 10, 1171 Copenhagen', 4.5, 12.573241, 55.680442, true),
    (7, 'cafe Bjerget', 'this cafe is known for its delicious coffee and homemade cakes', 'Bispebjerg Torv 8, 2400 Copenhagen', 4, 12.531878, 55.716591, true),
    (8, 'Café Retro', 'this cafe is known for its vegan food and cozy atmosphere', 'Knabrostræde 26, 1210 Copenhagen', 2.5, 12.575718, 55.676855, false),
    (9, 'Kaffeplantagen', 'this cafe is known for its great coffee and relaxed atmosphere', 'Skt. Hans Torv 3, 2200 Copenhagen', 4, 12.560347, 55.690607, true),
    (10, 'Café Dyrehaven', 'this cafe is known for its brunch and cozy atmosphere', 'Sønder Boulevard 72, 1720 Copenhagen', 4, 12.549581, 55.665790, true),
    (11, 'The Living Room', 'this cafe is known for its cozy atmosphere and great coffee', 'Larsbjørnsstræde 17, 1454 Copenhagen', 4.5, 12.568956, 55.678656, true),
    (12, 'Café Sommersko', 'this cafe is known for its cozy atmosphere and great food', 'Kronprinsensgade 6, 1114 Copenhagen', 3, 12.579108, 55.680740, false),
    (13, 'Café Katz', 'this cafe is known for its cozy atmosphere and great coffee', 'Nørrebrogade 88, 2200 Copenhagen', 4, 12.552292, 55.692415, false),
    (14, 'Café Norden', 'this cafe is known for its great coffee and cozy atmosphere', 'Østergade 61, 1100 Copenhagen', 2.5, 12.580186, 55.678973, false),
    (15, 'Studenterhuset', 'this cafe is known for its cozy atmosphere and great coffee', 'Købmagergade 52, 1150 Copenhagen', 4, 12.576420, 55.681489, true),
    (16, 'Riccos', 'this cafe is known for its cozy atmosphere, great food and coffee', 'Istedgade 119, 1650 Copenhagen', 3, 12.548264, 55.667615, true);


/* Insert data into users */
INSERT INTO users (users_id, first_name, last_name, email, username, hashed_password) VALUES
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

/* Insert Into opening hours */
INSERT INTO opening_hours (cafe_id, day_of_week, opening_time, closing_time)
VALUES
    -- Café Europa 1989
    (1, 'Monday', '08:00:00', '18:00:00'),
    (1, 'Tuesday', '08:00:00', '18:00:00'),
    (1, 'Wednesday', '08:00:00', '18:00:00'),
    (1, 'Thursday', '08:00:00', '18:00:00'),
    (1, 'Friday', '08:00:00', '18:00:00'),
    (1, 'Saturday', '10:00:00', '16:00:00'),
    (1, 'Sunday', '10:00:00', '16:00:00'),

    -- Café Victor
    (2, 'Monday', '09:00:00', '19:00:00'),
    (2, 'Tuesday', '09:00:00', '19:00:00'),
    (2, 'Wednesday', '09:00:00', '19:00:00'),
    (2, 'Thursday', '09:00:00', '19:00:00'),
    (2, 'Friday', '09:00:00', '19:00:00'),
    (2, 'Saturday', '10:00:00', '17:00:00'),
    (2, 'Sunday', '10:00:00', '17:00:00'),

    -- Democratic Coffee
    (3, 'Monday', '07:30:00', '17:30:00'),
    (3, 'Tuesday', '07:30:00', '17:30:00'),
    (3, 'Wednesday', '07:30:00', '17:30:00'),
    (3, 'Thursday', '07:30:00', '17:30:00'),
    (3, 'Friday', '07:30:00', '17:30:00'),
    (3, 'Saturday', '09:00:00', '15:00:00'),
    (3, 'Sunday', '09:00:00', '15:00:00'),

    -- Absalon
    (4, 'Monday', '10:00:00', '22:00:00'),
    (4, 'Tuesday', '10:00:00', '22:00:00'),
    (4, 'Wednesday', '10:00:00', '22:00:00'),
    (4, 'Thursday', '10:00:00', '22:00:00'),
    (4, 'Friday', '10:00:00', '22:00:00'),
    (4, 'Saturday', '10:00:00', '18:00:00'),
    (4, 'Sunday', '10:00:00', '18:00:00'),

    -- Henckell
    (5, 'Monday', '08:30:00', '19:30:00'),
    (5, 'Tuesday', '08:30:00', '19:30:00'),
    (5, 'Wednesday', '08:30:00', '19:30:00'),
    (5, 'Thursday', '08:30:00', '19:30:00'),
    (5, 'Friday', '08:30:00', '19:30:00'),
    (5, 'Saturday', '09:30:00', '17:30:00'),
    (5, 'Sunday', '09:30:00', '17:30:00'),

    -- Paludan Bog & Cafe
    (6, 'Monday', '08:00:00', '19:30:00'),
    (6, 'Tuesday', '08:00:00', '19:30:00'),
    (6, 'Wednesday', '08:00:00', '19:30:00'),
    (6, 'Thursday', '08:00:00', '19:30:00'),
    (6, 'Friday', '08:00:00', '22:00:00'),
    (6, 'Saturday', '10:00:00', '15:00:00'),
    (6, 'Sunday', '10:00:00', '15:00:00'),

    -- Cafe Bjerget
    (7, 'Monday', '08:00:00', '17:00:00'),
    (7, 'Tuesday', '08:00:00', '17:00:00'),
    (7, 'Wednesday', '08:00:00', '17:00:00'),
    (7, 'Thursday', '08:00:00', '17:00:00'),
    (7, 'Friday', '08:00:00', '17:00:00'),
    (7, 'Saturday', '10:00:00', '15:00:00'),
    (7, 'Sunday', '10:00:00', '15:00:00'),

    -- Café Retro
    (8, 'Monday', '09:30:00', '18:30:00'),
    (8, 'Tuesday', '09:30:00', '18:30:00'),
    (8, 'Wednesday', '09:30:00', '18:30:00'),
    (8, 'Thursday', '09:30:00', '18:30:00'),
    (8, 'Friday', '09:30:00', '18:30:00'),
    (8, 'Saturday', '11:00:00', '16:00:00'),
    (8, 'Sunday', '11:00:00', '16:00:00'),

    -- Kaffeplantagen
    (9, 'Monday', '07:00:00', '16:00:00'),
    (9, 'Tuesday', '07:00:00', '16:00:00'),
    (9, 'Wednesday', '07:00:00', '16:00:00'),
    (9, 'Thursday', '07:00:00', '16:00:00'),
    (9, 'Friday', '07:00:00', '16:00:00'),
    (9, 'Saturday', '09:30:00', '15:30:00'),
    (9, 'Sunday', '09:30:00', '15:30:00'),

    -- Café Dyrehaven
    (10, 'Monday', '08:30:00', '17:30:00'),
    (10, 'Tuesday', '08:30:00', '17:30:00'),
    (10, 'Wednesday', '08:30:00', '17:30:00'),
    (10, 'Thursday', '08:30:00', '17:30:00'),
    (10, 'Friday', '08:30:00', '17:30:00'),
    (10, 'Saturday', '10:30:00', '16:30:00'),
    (10, 'Sunday', '10:30:00', '16:30:00'),

    -- The Living Room
    (11, 'Monday', '09:00:00', '19:00:00'),
    (11, 'Tuesday', '09:00:00', '19:00:00'),
    (11, 'Wednesday', '09:00:00', '19:00:00'),
    (11, 'Thursday', '09:00:00', '19:00:00'),
    (11, 'Friday', '09:00:00', '19:00:00'),
    (11, 'Saturday', '11:00:00', '18:00:00'),
    (11, 'Sunday', '11:00:00', '18:00:00'),

    -- Café Sommersko
    (12, 'Monday', '10:00:00', '20:00:00'),
    (12, 'Tuesday', '10:00:00', '20:00:00'),
    (12, 'Wednesday', '10:00:00', '20:00:00'),
    (12, 'Thursday', '10:00:00', '20:00:00'),
    (12, 'Friday', '10:00:00', '20:00:00'),
    (12, 'Saturday', '12:00:00', '17:00:00'),
    (12, 'Sunday', '12:00:00', '17:00:00'),

    -- Café Katz
    (13, 'Monday', '08:00:00', '18:00:00'),
    (13, 'Tuesday', '08:00:00', '18:00:00'),
    (13, 'Wednesday', '08:00:00', '18:00:00'),
    (13, 'Thursday', '08:00:00', '18:00:00'),
    (13, 'Friday', '08:00:00', '18:00:00'),
    (13, 'Saturday', '09:00:00', '16:00:00'),
    (13, 'Sunday', '09:00:00', '16:00:00'),

    -- Café Norden
    (14, 'Monday', '07:30:00', '17:30:00'),
    (14, 'Tuesday', '07:30:00', '17:30:00'),
    (14, 'Wednesday', '07:30:00', '17:30:00'),
    (14, 'Thursday', '07:30:00', '17:30:00'),
    (14, 'Friday', '07:30:00', '17:30:00'),
    (14, 'Saturday', '10:00:00', '16:00:00'),
    (14, 'Sunday', '10:00:00', '16:00:00'),

    -- Studenterhuset
    (15, 'Monday', '09:00:00', '21:00:00'),
    (15, 'Tuesday', '09:00:00', '21:00:00'),
    (15, 'Wednesday', '09:00:00', '21:00:00'),
    (15, 'Thursday', '09:00:00', '21:00:00'),
    (15, 'Friday', '09:00:00', '23:00:00'),
    (15, 'Saturday', '11:00:00', '23:00:00'),
    (15, 'Sunday', '11:00:00', '23:00:00'),

    -- Riccos
    (16, 'Monday', '08:30:00', '17:30:00'),
    (16, 'Tuesday', '08:30:00', '17:30:00'),
    (16, 'Wednesday', '08:30:00', '17:30:00'),
    (16, 'Thursday', '08:30:00', '17:30:00'),
    (16, 'Friday', '08:30:00', '17:30:00'),
    (16,'Saturday','07:30:00','15:00:00'),
    (16,'Sunday','07:30:00','15:00:00');

create index cafe_id
    on favorites (cafe_id);

update cafes
set address = case
                  when cafe_id = 5 then 'Gl. Kongevej 108, 1850 Frederiksberg'
                  else address
    END;


UPDATE cafes
SET address = CASE
                  WHEN cafe_name = 'Café Europa 1989' THEN 'Amagertorv 1, 1160 København K'
                  WHEN cafe_name = 'Café Victor' THEN 'Ny Østergade 8, 1101 København K'
                  WHEN cafe_name = 'Democratic Coffee' THEN 'Krystalgade 15, 1172 København K'
                  WHEN cafe_name = 'Absalon' THEN 'Sønder Boulevard 73, 1720 København V'
                  WHEN cafe_name = 'Henckell' THEN 'Gl. Kongevej 108, 1850 Frederiksberg'
                  WHEN cafe_name = 'Paludan Bog & Café' THEN 'Fiolstræde 10, 1171 København K'
                  WHEN cafe_name = 'Cafe Bjerget' THEN 'Bispebjerg Torv 8, 2400 København NV'
                  WHEN cafe_name = 'Café Retro' THEN 'Knabrostræde 26, 1210 København K'
                  WHEN cafe_name = 'Kaffeplantagen' THEN 'Skt. Hans Torv 3, 2200 København N'
                  WHEN cafe_name = 'Café Dyrehaven' THEN 'Sønder Boulevard 72, 1720 København V'
                  WHEN cafe_name = 'The Living Room' THEN 'Larsbjørnsstræde 17, 1454 København K'
                  WHEN cafe_name = 'Café Sommersko' THEN 'Kronprinsensgade 6, 1114 København K'
                  WHEN cafe_name = 'Café Katz' THEN 'Nørrebrogade 88, 2200 København N'
                  WHEN cafe_name = 'Café Norden' THEN 'Østergade 61, 1100 København K'
                  WHEN cafe_name = 'Studenterhuset' THEN 'Købmagergade 52, 1150 København K'
                  WHEN cafe_name = 'Riccos' THEN 'Istedgade 119, 1650 København V'
                  ELSE address
    END;