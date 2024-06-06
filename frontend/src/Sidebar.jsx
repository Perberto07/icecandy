import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './component/css/Sidebar.css';
import Header from './Header';
import HomeIcon from './images/home.png';
import CustomerIcon from './images/customer.png';
import ProductIcon from './images/product.png';
import OrderIcon from './images/order.png';
//import TransactionIcon from './images/transaction.png'; // Uncomment this line
import LogoutIcon from './images/logout.png';
import axios from 'axios';

function Sidebar() {
  const navigate = useNavigate();
  const [showCustomerSubMenu, setShowCustomerSubMenu] = useState(false);
  const [showProductSubMenu, setShowProductSubMenu] = useState(false);
  const [showOrderSubMenu, setShowOrderSubMenu] = useState(false);
  //const [showTransactionSubMenu, setShowTransactionSubMenu] = useState(false);

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

  return (
    <>
      <Header />
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/Home" className="active">
                <img src={HomeIcon} alt="Home" className="icon3" />
                <span className="text">Home</span>
              </Link>
            </li>
            <li onClick={() => setShowCustomerSubMenu(!showCustomerSubMenu)}>
              <button className="submenu-toggle">
                <div>
                  <img src={CustomerIcon} alt="Customer" className="icon3" />
                  <span className="text">Customer</span>
                </div>
              </button>
              {showCustomerSubMenu && (
                <ul className="submenu">
                  <li>
                    <Link to="/Customer/Customerlist" className="button1">
                      <i className="fas fa-list"></i> Customer List
                    </Link>
                  </li>
                  <li className="product">
                    <Link to="/Customer/Addcustomer" className="button1">
                      <i className="fas fa-plus"></i> Add Customer
                    </Link>
                  </li>
                  <li className="product">
                    <Link to="/Customer/Editcustomer" className="button1">
                      <i className="fas fa-edit"></i> Edit Customer
                    </Link>
                  </li>
                  <li className="product">
                    <Link to="/Customer/Deletecustomer" className="button1">
                      <i className="fas fa-trash"></i> Delete Customer
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li onClick={() => setShowProductSubMenu(!showProductSubMenu)}>
              <button className="submenu-toggle">
                <div>
                  <img src={ProductIcon} alt="Product" className="icon3" />
                  <span className="text">Product</span>
                </div>
              </button>
              {showProductSubMenu && (
                <ul className="submenu">
                  <li>
                    <Link to="/Product/Productlist" className="button1">
                      <i className="fas fa-list"></i> Product List
                    </Link>
                  </li>
                  <li className="product">
                    <Link to="/Product/Addproduct" className="button1">
                      <i className="fas fa-plus"></i> Add Product
                    </Link>
                  </li>
                  <li className="product">
                    <Link to="/Product/Editproduct" className="button1">
                      <i className="fas fa-edit"></i> Edit Product
                    </Link>
                  </li>
                  <li className="product">
                    <Link to="/Product/Deleteproduct" className="button1">
                      <i className="fas fa-trash"></i> Delete Product
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li onClick={() => setShowOrderSubMenu(!showOrderSubMenu)}>
              <button className="submenu-toggle">
                <div>
                  <img src={OrderIcon} alt="Order" className="icon3" />
                  <span className="text">Order</span>
                </div>
              </button>
              {showOrderSubMenu && (
                 <ul className="submenu">
                  <li>
                   <Link to="/Order/Transactiondetail" className="button1">
                     <i className="fas fa-list"></i> Order List
                   </Link>
                 </li>
                 <li>
                   <Link to="/Order/Addorder" className="button1">
                     <i className="fas fa-plus"></i> Add Order
                   </Link>
                 </li>
                 {/*<li className="product">
                   <Link to="/Order/Editorder" className="button1">
                     <i className="fas fa-edit"></i> Edit Order
                   </Link>
                 </li>*/}
                 <li className="product">
                   <Link to="/Order/Deleteorder" className="button1">
                     <i className="fas fa-trash"></i> Delete Order
                   </Link>
                 </li>
               </ul>
             )}
           </li>
           {/*<li onClick={() => setShowTransactionSubMenu(!showTransactionSubMenu)}>
              <button className="submenu-toggle">
                <div>
                  <img src={TransactionIcon} alt="Transaction" className="icon3" />
                  <span className="text">Transaction</span>
                </div>
              </button>
              {showTransactionSubMenu && (
                 <ul className="submenu">
                  <li>
                   <Link to="/Transaction/Transactiondetail" className="button1">
                     <i className="fas fa-list"></i> Transaction List
                   </Link>
                 </li>
                 <li>
                   <Link to="/Transaction/Addtransaction" className="button1">
                     <i className="fas fa-plus"></i> Add Transaction
                   </Link>
                 </li>
                 <li className="product">
                   <Link to="/Transaction/Edittransaction" className="button1">
                     <i className="fas fa-edit"></i> Edit Transaction
                   </Link>
                 </li>
                 <li className="product">
                   <Link to="/Transaction/Deletetransaction" className="button1">
                     <i className="fas fa-trash"></i> Delete Transaction
                   </Link>
                 </li>
               </ul>
             )}
           </li>*/}
            <li>
              <button onClick={handleLogout} className="logout-button">
                <img src={LogoutIcon} alt="Logout" className="icon3" />
                <span className="logout">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
