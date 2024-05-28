import { Link, useNavigate } from 'react-router-dom';
import './component/css/Sidebar.css';
import Header from './Header';
import HomeIcon from './images/home.png';
import CustomerIcon from './images/customer.png';
import ProductIcon from './images/product.png';
import OrderIcon from './images/order.png';
import TransactionIcon from './images/transaction.png';
import LogoutIcon from './images/logout.png';
import axios from 'axios';

function Sidebar() {
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
            <li>
              <Link to="/Customer">
                <img src={CustomerIcon} alt="Customer" className="icon3" />
                <span className="text">Customer</span>
              </Link>
            </li>
            <li>
              <Link to="/Product">
                <img src={ProductIcon} alt="Product" className="icon3" />
                <span className="text">Product</span>
              </Link>
            </li>
            <li>
              <Link to="/Order">
                <img src={OrderIcon} alt="Order" className="icon3" />
                <span className="text">Order</span>
              </Link>
            </li>
            <li>
              <Link to="/Transaction">
                <img src={TransactionIcon} alt="Transaction" className="icon3" />
                <span className="text">Transaction</span>
              </Link>
            </li>
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
