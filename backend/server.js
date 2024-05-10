const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Replace this with your frontend URL
    credentials: true, // Enable credentials
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "deliciousicecandy"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});




const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Message: "we need token please provide it, login now"})
    }else{
        jwt.verify(token, "our-jsonwebtoken-secret-Key", (err, decoded) =>{
            if(err){
                return res.json({Message: "Authentication Error."})
            }else{
                req.name = decoded.name;
                next();
            } 
        })
    }
};

app.get('/login', verifyUser, (req, res) => {
    return res.json({Status: " Success", name: req.name})
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE UserName=? AND Password = ?";
    const values = [
        req.body.username, 
        req.body.password,
    ];
    db.query(sql, values, (err, data) => { 
        if (err) return res.json("error");
        if(data.length > 0){
            const name = data[0].name;
            const token = jwt.sign({name}, "our-jsonwebtoken-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        }
        else{
            return res.json({Message: "No record"});
        }
    });
});



app.post('/create', (req, res) =>{
    const sql = "INSERT INTO newsletter (`newsTitle`, `information`, `bibleverse`) VALUES ?";
    const values = [
        [req.body.newsTitle,
        req.body.information,
        req.body.bibleverse]
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });    
});



const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
