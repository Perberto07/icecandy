import React, { useState, useEffect } from 'react';
import logo from './images/icecandy.jpg'; // Import your logo image
import './css/Header.css';

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
      <img src={logo} alt="Logo" className="icecandy-logo" />
      <div className="icecandy-text-container"> {/* Container for the "Delicious Ice Candy" text */}
        <h1>Delicious Ice Candy</h1>
      </div>
      <div className="date-time-container">
        <p className="current-date-time" dangerouslySetInnerHTML={{ __html: getCurrentDateTime() }}></p>
      </div>
    </div>
  );
}

export default Header;
