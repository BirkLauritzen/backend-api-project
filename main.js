const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "/*Insert password*/",
    database: "cafes_database"
});


app.listen(port,()=>{
    console.log(`Application is now running on port ${port}`);
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


/*
app.get /user
Table: users
 */
app.get('/user', (req,res)=> {
    const q = `select * 
                      from users`;
    connection.query(q,(error,result)=>{
        res.send(result);
    });
});

app.get('/user/:user_id', (req,res)=> {
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
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    const q = `insert into users
                      (first_name,last_name) values (?,?)`;

    connection.query(q,[firstName,lastName], (error,result) => {
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
 */
app.post(`/new-cafe`,(req,res)=>{
    const cafeName = req.body.cafe_name;
    const description = req.body.descriptions;
    const address = req.body.address;
    const rating = req.body.rating;

    const q = `insert into cafes
                      (cafe_name, descriptions,address,rating) values (?,?,?,?)`;

    connection.query(q,[cafeName,description,address,rating], (error,result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        } else {
            console.log('Cafe inserted successfully');
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
app.post(`/new-favorite`,(req,res)=>{
    const cafeName = req.body.favorite_cafe_name;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    const insertFavoriteQ = `insert into favorites
                                    (cafe_id,favorite_cafe_name,users_id,first_name,last_name) 
                                    values(
                                    (select cafe_id from cafes where cafe_name = ?), 
                                    ?,
                                    (select users_id from users where first_name = ? and last_name = ?),
                                    ?,
                                    ? 
                                    )`;


    connection.query(insertFavoriteQ, [cafeName,cafeName,firstName,lastName,firstName,lastName], (error,result) => {
        if (error) {
            console.error("Error inserting into favorites:", error);
            res.status(500).send("Internal server error");
            return;
        }

        const checkUserQ = `select users_id
                                    from users 
                                    where first_name = ? and last_name = ?
        `;

        connection.query(checkUserQ,[firstName,lastName], (error,userResult) => {
           if (error) {
               console.error(error);
               res.status(500).send("Internal server error");
           }

           if (userResult.length === 0) {
               const createUserQ = `Insert into users 
                                            (first_name,last_name) 
                                            values (?,?)
               `;
                connection.query(createUserQ,[firstName,lastName], (error,createUserResult) => {
                    if (error) {
                        console.error(error);
                        res.status(500).send("Internal server error");
                        return;
                    }

                    console.log("New user created:",createUserResult.insertId);
                    res.send("New favorite cafe added and new user created");
               });
           } else {
               res.send("New favorite cafe added");
           }
        });
    });
});

