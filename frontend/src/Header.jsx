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
        <h1>Delicious Ice Candy</h1>
      </div>

      <div className='icon'>
        <Link to="/Home" className="active"><img src={home} alt="Home" className="icon2" /></Link>
        <Link to="/Customer"><img src={Customer} alt="customer" className="icon2" /></Link>
        <Link to="/Product"><img src={Product} alt="product" className="icon2" /></Link>
        <Link to="/Order"><img src={Order} alt="order" className="icon2" /></Link>
        <Link to="/Transaction"><img src={Transaction} alt="Transaction" className="icon2" /></Link>
        <Link to="/"><img src={Logout} alt="Logout" className="icon2" /></Link>
      </div>

      <div className="date-time-container">
        <p className="current-date-time" dangerouslySetInnerHTML={{ __html: getCurrentDateTime() }}></p>
      </div>
    </div>


  );
}

export default Header;
