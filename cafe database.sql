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
add column rating float;


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


	
/* Update statements */
update favorites
set users_id = 1
where favorite_id = 10;


    
    

    
    



