const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());

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
app.get
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
app.post
 */

