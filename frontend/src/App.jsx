import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./component/Login";
import Home from "./component/Home";
import Addcustomer from "./component/Addcustomer";
import Customer from "./component/Customer";
import Editcustomer from "./component/Editcustomer";
import Product from "./component/Product";
import Addproduct from "./component/Addproduct";
import Editproduct from "./component/Editproduct";

import Addorder from "./component/Addorder";
import Editorder from "./component/Editorder";
import Transaction from "./component/Transaction";
import Deletecustomer from "./component/Deletecustomer";
import Deleteproduct from "./component/Deleteproduct";
import Deleteorder from "./component/Deleteorder";
import Settings from "./component/Settings";
import Customerlist from "./component/Customerlist";
import Productlist from "./component/Productlist";
import TransactionDetails from "./component/TransactionDetails";
import Order from "./component/Order";

const Customerpage = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Customer/>}></Route>
                <Route path='/Customerlist' element={<Customerlist/>}></Route>
                <Route path='/Addcustomer' element={<Addcustomer/>}></Route>
                <Route path='/Editcustomer' element={<Editcustomer/>}></Route>
                <Route path='/Deletecustomer' element={<Deletecustomer/>}></Route>
            </Routes>
        </>
    );
};

const Productpage = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Product/>}></Route>
                <Route path='/Productlist' element={<Productlist/>}></Route>
                <Route path='/Addproduct' element={<Addproduct/>}></Route>
                <Route path='/Editproduct' element={<Editproduct/>}></Route>
                <Route path='/Deleteproduct' element={<Deleteproduct/>}></Route>
            </Routes>
        </>
    );
};

const Orderpage = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Order/>}></Route>
                <Route path='/Addorder' element={<Addorder/>}></Route>
                <Route path='/Transactiondetail' element={<TransactionDetails/>}></Route>
                <Route path='/Editorder' element={<Editorder/>}></Route>
                <Route path='/Deleteorder' element={<Deleteorder/>}></Route>
            </Routes>
        </>
    );
};

/*const Transactionpage = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Transaction/>}></Route>
                <Route path='/Transaction' element={<Transaction/>}></Route>
                <Route path='/Settings' element={<Settings/>}></Route>
            </Routes>
        </>
    );
};*/

function App() {
    return (
        <div>
            <BrowserRouter>                 
                <div>
                    <Routes>
                        <Route path='/' element={<Login/>}></Route>
                        <Route path='/Home' element={<Home/>}></Route>
                        <Route path='/Customer/*' element={<Customerpage/>}></Route>
                        <Route path='/Product/*' element={<Productpage/>}></Route>
                        {/*<Route path='/Transaction/*' element={<Transactionpage/>}></Route>*/}
                        <Route path='/Order/*' element={<Orderpage/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
