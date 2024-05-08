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
import Order from "./component/Order";
import Addorder from "./component/Addorder";
import Editorder from "./component/Editorder";

const Customerpage = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Customer/>}></Route>
                <Route path='/Addcustomer' element={<Addcustomer/>}></Route>
                <Route path='/Editcustomer' element={<Editcustomer/>}></Route>
            </Routes>
        </>
    );
};

const Productpage = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Product/>}></Route>
                <Route path='/Addproduct' element={<Addproduct/>}></Route>
                <Route path='/Editproduct' element={<Editproduct/>}></Route>
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
                <Route path='/Editorder' element={<Editorder/>}></Route>
            </Routes>
        </>
    );
};



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
                    <Route path='/Order/*' element={<Orderpage/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </div>
);
}

export default App
