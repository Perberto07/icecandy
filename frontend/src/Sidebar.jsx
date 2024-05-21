import { Link } from "react-router-dom";
import './component/css/Sidebar.css';
import Header from "./Header";
import Home from './images/home.png';
import Customer from './images/customer.png';
import Product from './images/product.png';
import Order from './images/order.png';
import Transaction from './images/transaction.png';
import Logout from './images/logout.png';

function Sidebar() {
  return (
    <>
      <Header/>
      <div className="sidebar">
        <nav>
          <ul>
            <li><Link to="/Home" className="active"><img src={Home} alt="Home" className="Home" /> Home</Link></li>
            <li><Link to="/Customer"><img src={Customer} alt="customer" className="Customer" /> Customer</Link></li>
            <li><Link to="/Product"><img src={Product} alt="product" className="Product" />Product</Link></li>
            <li><Link to="/Order"><img src={Order} alt="order" className="Order" /> Order</Link></li>
            <li><Link to="/Transaction"><img src={Transaction} alt="Transaction" className="Transaction" />Transaction</Link></li>
            <li><Link to="/"><img src={Logout} alt="Logout" className="Logout" />Logout</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
