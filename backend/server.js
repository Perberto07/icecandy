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
    const sql = "SELECT * FROM user WHERE Username=?";
    const values = [req.body.username];
    
    db.query(sql, values, (err, data) => { 
        if (err) return res.json({ Status: "Error", Message: "Database error" });

        if (data.length === 0) {
            return res.json({ Status: "Error", Message: "Wrong username" });
        } else {
            const user = data[0];
            if (user.Password === req.body.password) {
                const name = user.name;
                const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
                res.cookie('token', token);
                return res.json({ Status: "Success" });
            } else {
                return res.json({ Status: "Error", Message: "Wrong password" });
            }
        }
    });
});




app.get("/customer", (req, res)=>{
    const sql = "SELECT * FROM Customer";
     db.query(sql, (err, data)=>{
        if(err) return res.json("error");
        return res.json(data);
     })
})

app.get("/product", (req, res)=>{
    const sql = "SELECT * FROM product";
     db.query(sql, (err, data)=>{
        if(err) return res.json("error");
        return res.json(data);
     })
})



const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
