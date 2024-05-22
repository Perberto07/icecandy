import React from 'react';
import { Link } from 'react-router-dom';
import './component/css/Sidebar.css';
import Header from './Header';
import HomeIcon from './images/home.png';
import CustomerIcon from './images/customer.png';
import ProductIcon from './images/product.png';
import OrderIcon from './images/order.png';
import TransactionIcon from './images/transaction.png';
import LogoutIcon from './images/logout.png';

function Sidebar() {
  return (
    <>
      <Header />
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/Home" className="active">
                <img src={HomeIcon} alt="Home" className="icon" />
                <span className="text">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/Customer">
                <img src={CustomerIcon} alt="Customer" className="icon" />
                <span className="text">Customer</span>
              </Link>
            </li>
            <li>
              <Link to="/Product">
                <img src={ProductIcon} alt="Product" className="icon" />
                <span className="text">Product</span>
              </Link>
            </li>
            <li>
              <Link to="/Order">
                <img src={OrderIcon} alt="Order" className="icon" />
                <span className="text">Order</span>
              </Link>
            </li>
            <li>
              <Link to="/Transaction">
                <img src={TransactionIcon} alt="Transaction" className="icon" />
                <span className="text">Transaction</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src={LogoutIcon} alt="Logout" className="icon" />
                <span className="text">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
