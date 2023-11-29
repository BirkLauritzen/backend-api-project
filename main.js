const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const {request} = require("express");
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "cafes_database"
});

app.listen(port,()=>{
    console.log(`Application is now running on port ${port}`);
});

app.get('/', (req,res)=> {
    connection.query(`select * from cafes`,(error,result)=>{
       res.send(result);
    });
});

