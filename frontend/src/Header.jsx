import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/icecandy.jpg';
import home from './images/home.png';
import Customer from './images/customer.png';
import Product from './images/product.png';
import OrderIcon from './images/order.png';
import Logouticon from './images/logout.png';
import './css/Header.css';
import axios from 'axios';

function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showCustomerSubMenu, setShowCustomerSubMenu] = useState(false);
  const [showProductSubMenu, setShowProductSubMenu] = useState(false);
  const [showOrderSubMenu, setShowOrderSubMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      axios.post('http://localhost:8080/logout')
        .then(res => {
          if (res.data.Status === "Success") {
            navigate('/');
          } else {
            console.error("Logout failed:", res.data.Message);
          }
        })
        .catch(err => {
          console.error("Logout error:", err);
        });
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

    const currentDate = now.toLocaleDateString('en-US', dateOptions);
    const currentTime = now.toLocaleTimeString('en-US', timeOptions);

    return `${currentDate}<br />${currentTime}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="header">
      <div className="business-container">
        <Link to="/Home" className="active">
          <img src={logo} alt="Logo" className="icecandy" />
        </Link>
        <h1 className='business'>Delicious Ice Candy</h1>
      </div>

      <div className='datetime-icons'>
        <div className="date-time-container">
          <p className="current-date-time" dangerouslySetInnerHTML={{ __html: getCurrentDateTime() }}></p>
        </div>

        <div className='icons'>
          <Link to="/Home" className="icon-container">
            <img src={home} alt="Home" className="icon2" />
            <span className="icon-text">Home</span>
          </Link>
          <div className="icon-container" onClick={() => setShowCustomerSubMenu(!showCustomerSubMenu)}>
            <img src={Customer} alt="Customer" className="icon2" />
            <span className="icon-text">Customer</span>
            {showCustomerSubMenu && (
              <ul className="customer-submenu">
                <li>
                  <Link to="/Customer/Customerlist" className="submenu-link">
                    <i className="fas fa-list"></i> Customer List
                  </Link>
                </li>
                <li>
                  <Link to="/Customer/Addcustomer" className="submenu-link">
                    <i className="fas fa-plus"></i> Add Customer
                  </Link>
                </li>
                <li>
                  <Link to="/Customer/Editcustomer" className="submenu-link">
                    <i className="fas fa-edit"></i> Edit Customer
                  </Link>
                </li>
                <li>
                  <Link to="/Customer/Deletecustomer" className="submenu-link">
                    <i className="fas fa-trash"></i> Delete Customer
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="icon-container" onClick={() => setShowProductSubMenu(!showProductSubMenu)}>
            <img src={Product} alt="Product" className="icon2" />
            <span className="icon-text">Product</span>
            {showProductSubMenu && (
              <ul className="product-submenu">
                <li>
                  <Link to="/Product/Productlist" className="submenu-link">
                    <i className="fas fa-list"></i> Product List
                  </Link>
                </li>
                <li>
                  <Link to="/Product/Addproduct" className="submenu-link">
                    <i className="fas fa-plus"></i> Add Product
                  </Link>
                </li>
                <li>
                  <Link to="/Product/Editproduct" className="submenu-link">
                    <i className="fas fa-edit"></i> Edit Product
                  </Link>
                </li>
                <li>
                  <Link to="/Product/Deleteproduct" className="submenu-link">
                    <i className="fas fa-trash"></i> Delete Product
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="icon-container" onClick={() => setShowOrderSubMenu(!showOrderSubMenu)}>
            <img src={OrderIcon} alt="Order" className="icon2" />
            <span className="icon-text">Order</span>
            {showOrderSubMenu && (
              <ul className="order-submenu">
                <li>
                  <Link to="/Order/Transactiondetail" className="submenu-link">
                    <i className="fas fa-list"></i> Order List
                  </Link>
                </li>
                <li>
                  <Link to="/Order/Addorder" className="submenu-link">
                    <i className="fas fa-plus"></i> Add Order
                  </Link>
                </li>
                <li>
                  <Link to="/Order/Deleteorder" className="submenu-link">
                    <i className="fas fa-trash"></i> Delete Order
                  </Link>
                </li>
                <li>
                  <Link to="/Order/Report" className="submenu-link">
                    <i className="fas fa-file-alt"></i> Report
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="icon-container" onClick={handleLogout}>
            <img src={Logouticon} alt="Logout" className="icon2" />
            <span className="icon-text">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
