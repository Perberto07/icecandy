import { useState, useEffect } from 'react';
import logo from './images/icecandy.jpg'; // Import your logo image
import './css/Header.css';
import { Link } from 'react-router-dom';
import home from './images/home.png';
import Customer from './images/customer.png';
import Product from './images/product.png';
import Order from './images/order.png';
import Transaction from './images/transaction.png';
import Logout from './images/logout.png';


function Header() {
  // State to hold the current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Function to get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

    const currentDate = now.toLocaleDateString('en-US', dateOptions);
    const currentTime = now.toLocaleTimeString('en-US', timeOptions);

    return `${currentDate}<br />${currentTime}`;
  };

  // Effect to update the date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Render the Header component
  return (
    <div className="header">
      <div className="icecandy-text-container">
        <Link to="/Home" className="active"><img src={logo} alt="Logo" className="icecandy-logo" /></Link>
        <h1 className='brandname'>Delicious Ice Candy</h1>
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
        <Link to="/Customer" className="icon-container">
          <img src={Customer} alt="customer" className="icon2" />
          <span className="icon-text">Customer</span>
        </Link>
        <Link to="/Product" className="icon-container">
          <img src={Product} alt="product" className="icon2" />
          <span className="icon-text">Product</span>
        </Link>
        <Link to="/Order" className="icon-container">
          <img src={Order} alt="order" className="icon2" />
          <span className="icon-text">Order</span>
        </Link>
        {/*<Link to="/Transaction" className="icon-container">
          <img src={Transaction} alt="Transaction" className="icon2" />
          <span className="icon-text">Transaction</span>
  </Link>*/}
        <Link to="/" className="icon-container">
          <img src={Logout} alt="Logout" className="icon2" />
          <span className="icon-text">Logout</span>
        </Link>
      </div>

      
      </div>

    </div>


  );
}

export default Header;
