const express = require("express");
const expressSession = require("express-session")
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');
require('dotenv').config();
const path = require('path');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'localhost:3000/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'lax'
    }
}));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "cafes_database",
    multipleStatements: true,
});



connection.connect((error) => {
    if (!error) {
        console.log("connected");
    } else {
        console.log(error);
        console.log("Connection failed",error.message)
    }
});


app.listen(port,()=>{
    console.log(`Application is now running on port ${port}`);
});

// http://localhost:3000/login/

const saltRounds = 10;

app.get('/register', (req, res) => {
    console.log('GET /register');
    res.sendFile(__dirname + '/login/register.html');
});

app.post('/register', (req, res) => {
    console.log('POST /register');
    console.log(req.body); // Logs the data received from the form
    const username = req.body['newUsername'];
    const password = req.body['newPassword'];
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;

    // Check if the password is empty
    if (!password) {
        return res.status(400).send('Password is required');
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            console.error('Hashing error:', err);
            return res.status(500).send('Error hashing password');
        } else {
            const query = 'INSERT INTO users (first_name, last_name, email, username, hashed_password) VALUES (?, ?, ?, ?, ?)';
            connection.query(query, [first_name, last_name, email, username, hash], (error, result) => {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
                        console.error('Duplicate entry:', error);
                        return res.status(409).send('Username or email already exists');
                    } else {
                        console.error(error);
                        return res.status(500).send('Internal server error');
                    }
                } else {
                    res.redirect('/login');
                }
            });
        }
    });
});


app.get('/login', (req, res) => {
    console.log('GET /login');
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // SQL query to get user by username
    const query = 'SELECT users_id, hashed_password FROM users WHERE username = ?';
    connection.query(query, [username], (error, users) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (users.length > 0) {
            const user = users[0];
            bcrypt.compare(password, user.hashed_password, function(err, result) {
                if (result) {
                    console.log('User authenticated successfully');


                    req.session.user = { id: user.users_id, username: username };


                    res.json({ success: true, message: 'Authentication successful', userId: user.users_id });
                } else {
                    console.log('Authentication failed');
                    res.status(401).json({ success: false, message: 'Authentication failed' });
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

app.get('/overview', function(req, res) {
    console.log('GET /overview');
    if (req.session.user) {
        res.sendFile(__dirname + '/public/frontpage/frontpage.html');
    } else {
        res.redirect('/login');
    }
//res.sendFile(path.join(__dirname, './public/frontpage/frontpage.html'));
});

app.get('/index.html', (req, res) => {
    console.log('GET /index.html');
    res.sendFile(__dirname + '/index.html');
});


/*
app.get /cafe
Table: cafes
 */
app.get('/cafe', (req,res)=> {
    const q = `select * from cafes`;
    connection.query(q,(error,result)=>{
        res.send(result);
    });
});

app.get('/cafe/:cafe_id', (req,res)=> {
    const cafeIdRequest = req.params.cafe_id;
    const q = `select * 
                      from cafes
                      where cafe_id = ?`;
    connection.query(q,[cafeIdRequest],(error,result)=>{
        res.send(result);
    });
});
/*
app.get /rating
Table: cafes
url syntax: localhost:3000/rating?rating=2.5
 */
app.get('/rating', (req,res)=> {
    const { rating } = req.query;

    let q = `select cafe_name,descriptions,address,rating
                      from cafes
                      where`;

    if (rating) {
        q += ` rating = ${parseFloat(rating)}`;
    }

    connection.query(q,(error,result)=>{
        if (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        } else {
            res.send(result);
        }
    });
});

app.get('/api/user-info/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT * FROM users WHERE users_id = ?';
    connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('User not found');
        }
    });
});


/*
app.get /user
Table: users
 */
app.get('/users', (req,res)=> {
    const q = `select * 
                      from users`;
    connection.query(q,(error,result)=>{
        res.send(result);
    });
});

app.get('/users/:user_id', (req,res)=> {
    const userIdRequest = req.params.user_id;
    const q = `select * 
                      from users
                      where users_id = ?`;
    connection.query(q,[userIdRequest],(error,result)=>{
        res.send(result);
    });
});

/*
app.post
Table: user
Insert new user into the user table
It automatically creates a new user_id to the user been added.
 */
app.post(`/new-user`,(req,res)=>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    const q = `insert into users
                      (first_name,last_name) values (?,?)`;

    connection.query(q,[first_name,last_name], (error,result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        } else {
            console.log('User inserted successfully');
            res.send("Successful post request");
        }
    });

});

/*
app.post
Table: cafes
Insert new cafe into the cafes table, and
it automatically creates a new cafe_id to the cafe there's been added to the table.
Latitude and longitude have to be in it for the create cafe works
 */
app.post(`/new-cafe`,(req,res)=>{
    const cafe_name = req.body.cafe_name;
    const descriptions = req.body.descriptions;
    const address = req.body.address;
    const rating = req.body.rating;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const q = `insert into cafes
                      (cafe_name, descriptions,address,rating,latitude,longitude) values (?,?,?,?,?,?)`;

    connection.query(q,[cafe_name,descriptions,address,rating,latitude,longitude], (error,result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        } else {
            console.log('cafe inserted successfully');
            res.send("Successful post request");
        }
    });

});

/*
app.post
Table: favorites
It adds new favorite cafes,
where it inputs name and check if the person is a user
and if not it creates a new user.
 */

// Endpoint to get a user's favorite cafes
app.get('/favorites/:userId', (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const userId = req.params.userId;
    console.log('Requested user id:', userId);

    const query = `
        SELECT c.cafe_name, c.address, c.rating
        FROM favorites f
        JOIN cafes c ON f.cafe_id = c.cafe_id
        WHERE f.users_id = ?
    `;

    connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }

        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send('No favorite cafes found for this user');
        }
    });
});


app.post('/new-favorite', (req, res) => {
    const { favoriteCafeNames, userId } = req.body;

    // Handle multiple favorite cafe names
    favoriteCafeNames.forEach(cafeName => {
        const insertFavoriteQuery = `
            INSERT INTO favorites (cafe_id, favorite_cafe_name, users_id,first_name,last_name) 
            VALUES (
                (SELECT cafe_id FROM cafes WHERE cafe_name = ?),
                ?,
                ?,
                (select first_name from users where users_id = ?),
                (select last_name from users where users_id = ?)    
            )`;
        console.log('inserted query:', insertFavoriteQuery);

        connection.query(insertFavoriteQuery, [cafeName, cafeName, userId,userId,userId], (error, result) => {
            if (error) {
                console.error("Error inserting into favorites:", error);
                // Consider how to handle errors in a loop - maybe collect and send them together
            }
        });
    });

    // Send response after processing all cafes
    res.json({ success: true, message: "New favorite cafes added successfully" });
});

/* const checkUserQ = `SELECT users_id
                FROM users
                WHERE first_name = ? AND last_name = ?
            `;

        connection.query(checkUserQ, [first_name, last_name], (error, userResult) => {
            if (error) {
                console.error(error);
                res.status(500).send("Internal server error");
            }

            if (userResult.length === 0) {
                const createUserQ = `INSERT INTO users
                        (first_name, last_name)
                        VALUES (?, ?)
                    `;

                connection.query(createUserQ, [first_name, last_name], (error, createUserResult) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send("Internal server error");
                        return;
                    }

                    console.log("New user created:", createUserResult.insertId);
                    res.send("New favorite cafe added, and new user created");
                });
            } else {
                res.send("New favorite cafe added");
            }
        });*/
