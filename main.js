const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "/*Insert Password*/",
    database: "cafes_database"
});
/*Insert Password*/

app.listen(port,()=>{
    console.log(`Application is now running on port ${port}`);
});
/*
app.get /cafe
Table: cafes
 */

app.get('/', (req,res)=> {
    connection.query(`select * 
                    from cafes 
                    inner join favorites 
                    on favorites.cafe_id = cafes.cafe_id`,(error,result)=>{
       res.send(result);
    });
});

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
        res.send(result);
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
 */
app.post(`/new-user`,(req,res)=>{
    const userId = req.body.users_id;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;

    const q = `insert into users
                      (users_id,first_name,last_name) values (?,?,?)`;

    connection.query(q,[userId,firstName,lastName], (error,result) => {
        console.log('User inserted successfully');
        res.send("Successful post request");
    });

});

/*
app.post
Table: cafes
Insert new cafe into the cafes table
 */
app.post(`/new-cafe`,(req,res)=>{
    const cafeId = req.body.users_id;
    const cafeName = req.body.first_name;
    const lastName = req.body.last_name;

    const q = `insert into users
                      (users_id,first_name,last_name) values (?,?,?)`;

    connection.query(q,[userId,firstName,lastName], (error,result) => {
        console.log('User inserted successfully');
        res.send("Successful post request");
    });

});
/*
app.post
Table: favorites
 */
app.post(`/`,(req,res)=>{
    const favoriteId = req.body.favorite_id;
    const cafe_name = req.body.favorite_cafe_name;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;


});

