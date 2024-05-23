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
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username && !password) {
        return res.json({ Status: "Error", Message: "Username and Password are required" });
    }

    // Check if username is provided
    if (!username) {
        return res.json({ Status: "Error", Message: "Username is required" });
    }

    // Check if password is provided
    if (!password) {
        return res.json({ Status: "Error", Message: "Please enter your password" });
    }

    // Proceed with login authentication
    const sqlUser = "SELECT * FROM user WHERE Username=?";
    const sqlPassword = "SELECT * FROM user WHERE Password=?";
    const valuesUser = [username];
    const valuesPassword = [password];

    db.query(sqlUser, valuesUser, (err, dataUser) => {
        if (err) return res.json({ Status: "Error", Message: "Database error" });

        if (dataUser.length === 0) {
            // No user found with the given username, check password
            db.query(sqlPassword, valuesPassword, (err, dataPassword) => {
                if (err) return res.json({ Status: "Error", Message: "Database error" });

                if (dataPassword.length === 0) {
                    // No user found with the given password
                    return res.json({ Status: "Error", Message: "Invalid username and password" });
                } else {
                    // Username is incorrect, but the password exists
                    return res.json({ Status: "Error", Message: "Invalid username" });
                }
            });
        } else {
            const user = dataUser[0];
            if (user.Password === password) {
                const name = user.name;
                const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
                res.cookie('token', token);
                return res.json({ Status: "Success" });
            } else {
                // Password does not match
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

app.delete('/productdelete/:id', (req, res) =>{
    const sql = "DELETE from product WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error executing SQL query:", err);
            return res.json(data);
    });    
});



const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
