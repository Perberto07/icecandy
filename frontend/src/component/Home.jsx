import Sidebar from "../Sidebar"
import { Link } from "react-router-dom"
import home from '../images/home.png';
import Customer from '../images/customer.png';
import Product from '../images/product.png';
import Order from '../images/order.png';
import Transaction from '../images/transaction.png';
import Logout from '../images/logout.png';
import './css/Home.css'

function Home() {
  return (
    <>
    <div>
    <Sidebar/>
    </div>
    </>
  )
}

export default Home