const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
const db = require("./server");


router.use(cookieParser());

router.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE Username=? AND Password = ?";
    const values = [
        req.body.username, 
        req.body.password,
    ];
    db.query(sql, values, (err, data) => { 
        if (err) return res.status(500).json({ error: err.message });
        if(data.length > 0){
            const name = data[0].name;
            const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success" });
        }
        else{
            return res.json({ Message: "No record" });
        }
    });
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ Message: "Authentication Error: No token provided" });
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-Key", (err, decoded) =>{
            if(err){
                return res.status(401).json({ Message: "Authentication Error: Invalid token" });
            } else {
                req.name = decoded.name;
                next();
            } 
        })
    }
};

module.exports = { router, verifyUser };
