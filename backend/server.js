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

    if (!username || !password) {
        return res.json({ Status: "Error", Message: "Username and Password are required" });
    }

    const sqlUser = "SELECT * FROM user WHERE Username=?";
    const valuesUser = [username];

    db.query(sqlUser, valuesUser, (err, dataUser) => {
        if (err) return res.json({ Status: "Error", Message: "Database error" });

        if (dataUser.length === 0) {
            return res.json({ Status: "Error", Message: "Invalid username or password" });
        } else {
            const user = dataUser[0];
            if (user.Password === password) {
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

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success", Message: "Logged out successfully" });
});

app.get("/customer", (req, res)=>{
    const sql = "SELECT * FROM Customer";
    db.query(sql, (err, data)=>{
        if(err) return res.json("error");
        return res.json(data);
    });
});

app.get("/product", (req, res)=>{
    const sql = "SELECT * FROM product";
    db.query(sql, (err, data)=>{
        if(err) return res.json("error");
        return res.json(data);
    });
});

app.post("/addcustomer", (req, res)=>{
    const sql = "insert into customer (Name, Address, ContactPerson, CellphoneNo) Values(?)";
    const values=[
        req.body.Name,
        req.body.Address,
        req.body.ContactPerson,
        req.body.CellphoneNo
    ];
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.put("/customer/:id", (req, res) => {
    const { id } = req.params;
    const { Name, Address, ContactPerson, CellphoneNO } = req.body;
    const sql = "UPDATE customer SET Name = ?, Address = ?, ContactPerson = ?, CellphoneNo = ? WHERE CustomerNO = ?";
    const values = [Name, Address, ContactPerson, CellphoneNO, id];

    db.query(sql, values, (err, data) => {
        if (err) return res.json({ Status: "Error", Message: "Error updating customer" });
        return res.json({ Status: "Success", Message: "Customer updated successfully" });
    });
});

app.delete("/customer/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM customer WHERE CustomerNO = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json({ Status: "Error", Message: "Error deleting customer" });
        return res.json({ Status: "Success", Message: "Customer deleted successfully" });
    });
});

app.post("/addproduct", (req, res)=>{
    const sql = "insert into product (ProductFlavor, Price) Values(?)";
    const values=[
        req.body.ProductFlavor,
        req.body.Price,
    ];
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.put('/product/:ProductNO', (req, res) => {
    const productNO = req.params.ProductNO;
    const { ProductFlavor, Price } = req.body;
    const sql = 'UPDATE product SET ProductFlavor = ?, Price = ? WHERE ProductNO = ?';
    db.query(sql, [ProductFlavor, Price, productNO], (err, data) => {
        if (err) return res.json({ error: err.message });
        return res.json(data);
    });
});

app.delete('/product/:ProductNO', (req, res) => {
    const productNO = req.params.ProductNO;
    const sql = 'DELETE FROM product WHERE ProductNO = ?';
    db.query(sql, [productNO], (err, data) => {
        if (err) return res.json({ error: err.message });
        return res.json(data);
    });
});

app.post("/addorder", (req, res)=>{
    const sql = "insert into ordered (OrderNo, ProductNO, Quantity) Values(?)";
    const values=[
        req.body.OrderNo,
        req.body.ProductNO,
        req.body.Quantity,
    ];
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.post("/addtransaction", (req, res)=>{
    const sql = "insert into transaction (OrderNo, CustomerNO, Date,Sum) Values(?)";
    const values=[
        req.body.OrderNo,
        req.body.CustomerNO,
        req.body.Date,
        req.body.Sum,
    ];
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.get("/transaction", (req, res)=>{
    const sql = "SELECT * FROM transaction";
    db.query(sql, (err, data)=>{
        if(err) return res.json("error");
        return res.json(data);
    });
});

app.get("/order", (req, res)=>{
    const sql = "SELECT * FROM ordered";
    db.query(sql, (err, data)=>{
        if(err) return res.json("error");
        return res.json(data);
    });
});
  


const port = 8080;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
