
const express= require ("express");
const path = require('path');
const mysql = require ("mysql");
const dotenv = require('dotenv');

dotenv.config({path:"./.env"})

const app= express ();
const port =5000;

const db= mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:  process.env.DATABASE_PASSWORD,
    // database: 'nodejs-login',
    database: process.env.DATABASE
});

const publicDirectory= path.join(__dirname,'./public/');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('view engine','hbs');//template set we have used
db.connect((error)=>{
if(error)
{
    console.log(error);
}
else{
    console.log("MySQL Connnected.....");
}
});

//define routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));


app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});