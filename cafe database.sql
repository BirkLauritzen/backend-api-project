use cafes_database;
select * from cafes;
select * from users;
select * from favorites;

/* creating tables */
create table cafes (
cafe_id INT primary key,
cafe_name varchar(100),
descriptions text
);
alter table cafes
add column longitude decimal(9,6),
add column latitude decimal(9,6);


CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    cafe_id INT,
    favorite_cafe_name VARCHAR(255),
    users_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id),
    FOREIGN KEY (users_id) REFERENCES users(users_id)
);
alter table favorites
add constraint fk_favorites_users_id
foreign key (users_id) references users(users_id);


create table users (
users_id int primary key,
first_name varchar(100),
last_name varchar(100)
); 



/* Insert data into the tables */
INSERT INTO favorites (favorite_id,cafe_id,favorite_cafe_name,first_name,last_name) values
(1, 6, 'Paludan Bog & Café', 'Sophia','Brown'),
(2, 2, 'Café Victor','Alice','Smith'),
(3, 3, 'Democratic Coffee','Bob','Johnson'),
(4, 7, 'Cafe Bjerget','Daniel','Taylor'),
(5, 11, 'The Living Room','Emma','Davis'),
(6, 14, 'Café Norden','David','Anderson'),
(7, 8, 'Café Retro','Olivia','Miller'),
(8, 10, 'Café Dyrehaven','Michael','Jones'),
(9, 4, 'Absalon','Emily','Williams'),
(10, 12, 'Café Sommersko','John','Doe');
    
    INSERT INTO users (users_id, first_name, last_name) VALUES
    (1, 'John', 'Doe'),
    (2, 'Alice', 'Smith'),
    (3, 'Bob', 'Johnson'),
    (4, 'Emily', 'Williams'),
    (5, 'Michael', 'Jones'),
    (6, 'Sophia', 'Brown'),
    (7, 'Daniel', 'Taylor'),
    (8, 'Olivia', 'Miller'),
    (9, 'David', 'Anderson'),
    (10, 'Emma', 'Davis');
    
INSERT INTO cafes (cafe_id, cafe_name, description, address, rating, longitude, latitude)
VALUES
('1', 'Café Europa 1989', 'this café is inspired by European café culture and has a cozy atmosphere.', 'Amagertorv 1, 1160 Copenhagen', '3.5', '12.579290', '55.678670'),
('2', 'Café Victor', 'this café is known for its cozy atmosphere and is a popular meeting place.', 'Ny Østergade 8, 1101 Copenhagen', '4', '12.583250', '55.680750'),
('3', 'Democratic Coffee', 'this café is situated inside the Copenhagen Main Library and is known for its coffee and almond croissants.', 'Krystalgade 15, 1172 Copenhagen', '4.5', '12.573650', '55.680880'),
('4', 'Absalon', 'this former church has been transformed into a communal space and is a good place to meet with your study group.', 'Sønder Boulevard 73, 1720 Copenhagen', '4.5', '12.550310', '55.665390'),
('5', 'Henckell', 'this café has beautiful interiors and large windows, perfect for people-watching when you can no longer focus.', 'Gl. Kongevej 108, 1850 Frederiksberg', '5', '12.543710', '55.676040'),
('6', 'Paludan Bog & Café', 'this cafe is known for its cozy atmosphere and extensive book collection', 'Fiolstræde 10, 1171 Copenhagen', '4.5', '12.573241', '55.680442'),
('7', 'Cafe Bjerget', 'this cafe is known for its delicious coffee and homemade cakes', 'Bispebjerg Torv 8, 2400 Copenhagen', '4', '12.531878', '55.716591'),
('8', 'Café Retro', 'this cafe is known for its vegan food and cozy atmosphere', 'Knabrostræde 26, 1210 Copenhagen', '2.5', '12.575718', '55.676855'),
('9', 'Kaffeplantagen', 'this cafe is known for its great coffee and relaxed atmosphere', 'Skt. Hans Torv 3, 2200 Copenhagen', '4', '12.560347', '55.690607'),
('10', 'Café Dyrehaven', 'this cafe is known for its brunch and cozy atmosphere', 'Sønder Boulevard 72, 1720 Copenhagen', '4', '12.549581', '55.665790'),
('11', 'The Living Room', 'this cafe is known for its cozy atmosphere and great coffee', 'Larsbjørnsstræde 17, 1454 Copenhagen', '4.5', '12.568956', '55.678656'),
('12', 'Café Sommersko', 'this cafe is known for its cozy atmosphere and great food', 'Kronprinsensgade 6, 1114 Copenhagen', '3', '12.579108', '55.680740'),
('13', 'Café Katz', 'this cafe is known for its cozy atmosphere and great coffee', 'Nørrebrogade 88, 2200 Copenhagen', '4', '12.552292', '55.692415'),
('14', 'Café Norden', 'this cafe is known for its great coffee and cozy atmosphere', 'Østergade 61, 1100 Copenhagen', '2.5', '12.580186', '55.678973'),
('15', 'Studenterhuset', NULL, 'Købmagergade 52, 1150 Copenhagen', '4', '12.576420', '55.681489'),
('16', 'Riccos', NULL, 'Istedgade 119, 1650 Copenhagen', '3', '12.548264', '55.667615');


	
/* Update statements */
update cafes
set longitude = 12.579290 and latitude = 55.678670
where cafe_id = 1;



    
    

    
    



