const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require("./logger");
path = require('path');

const {connect} = require('http2');
const {builtinModules} = require('module');
const mysql = require('mysql');

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

const con = mysql.createConnection(
    {host: "localhost", port: "5000", user: "root", password: "password", database: "ever_onward"}
);

con.connect((err) => {
    if (err) 
        throw err;
    console.log("Connected to the db!");

});

// Init express
const app = express();

app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    // res.send(`Hello World!`);
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    if (!email || !pass || !ValidateEmail(email)) {
        return res
            .status(400)
            .json({msg: 'The data you sent is missing or is not correct'});
    }
    // console.log(email, pass);
    let sql = `INSERT INTO users (email, password) VALUES ('${email}', '${pass}')`;
    con.query(sql, function (err, result) {
        if (err) 
            throw err;
        console.log("1 record inserted");
    });
    res.redirect('/');
    // res.end("yes");
});


// dev_ops
app.get('/show_db', (req, res) => {
    let sql = `SELECT * FROM users`;
    con.query(sql, function (err, result) {
        if (err) 
            throw err;
        
        console.log(result);
        res.send(result);
        console.log("printed the table");
    });
})

app.get('/add_city', (req,res) =>{
    res.sendFile(path.join(__dirname, "add_city.html"));
})

app.get('/show_cities', (req,res) => {
    let sql = `SELECT * FROM city`;
    con.query(sql, function (err, result) {
        if (err) 
            throw err;
        
        // console.log(result);
        res.send(result);
        console.log("printed the table");
    });
})

app.get('/show_challenges', (req,res) => {
    let sql = `SELECT * FROM challenges`;
    con.query(sql, function (err, result) {
        if (err) 
            throw err;
        
        // console.log(result);
        res.send(result);
        console.log("printed the table");
    });
})

app.post('/add_city/submit', (req,res) => {
    const name = req.body.name;
    const country = req.body.country;
    const ff1 = req.body.ff1;
    const ff2 = req.body.ff2;
    const ff3 = req.body.ff3;

    console.log(name,country,ff1,ff2,ff3);

    let sql = `INSERT INTO city (name, country, fun_fact1, fun_fact2, fun_fact3) VALUES ('${name}', '${country}', '${ff1}', '${ff2}', '${ff3}')`;
    con.query(sql, function (err, result) {
        if (err) 
            throw err;
        console.log("1 record inserted");
    });
});

app.post('/add_challenge/submit', (req,res) =>{
    const city = req.body.city;
    const country = req.body.country;
    const name = req.body.name;
    const description = req.body.description;
    const score = req.body.score;
    let idcity, prev_Scoren, no_challenges;

    console.log(city,country,name,description,score);


    let sql = `SELECT idcity, total_score, no_challenges FROM city WHERE ( name = '${city}' AND country = '${country}' )`;
    con.query(sql, function (err, result) {
        if (err) 
            throw err;
        if (result.length > 1){
            console.log("there are multiple cities wiht this name, please fix!");
            res.send("there are multiple cities wiht this name, please fix!");
        }
        idcity = result[0].idcity;
        prev_Score = result[0].total_score;
        no_challenges = result[0].no_challenges;
        console.log(`Selected city '${city}' with id '${idcity}'`);

        sql = `INSERT INTO challenges (idcity, name, description, score) VALUES ('${idcity}', '${name}', '${description}', '${score}')`;
        con.query(sql, function (err, result) {
        if (err) 
            throw err;
        console.log("1 record inserted");
        no_challenges++;
        sql = `UPDATE city SET total_score = ${new_score}, no_challenges = ${no_challenges} WHERE idcity = ${idcity}`;
        con.query(sql, function (err, result) {
        if (err) 
            throw err;
        console.log("1 record updated");
        })
        })
        let new_score = prev_Score + score;
    });
})

app.get('')
// app.post('/login',function(req,res){     var username = req.body.username;
// var htmlData = 'Hello:' + username;     res.send(htmlData);
// console.log(htmlData);  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});