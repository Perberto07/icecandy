import './css/Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ADMIN from './images/admin.png';
import OTPModal from './OTPModal'; // Import the OTPModal component

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [errorVisible, setErrorVisible] = useState(false); // State to track error visibility
  const [showOTPModal, setShowOTPModal] = useState(false); // State to control OTP modal

  axios.defaults.withCredentials = true;

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitting login request with username:", username);

    axios.post('http://localhost:8080/login', { username, password })
      .then(res => {
        if (res.data.Status === "Success") {
          setShowOTPModal(true); // Show OTP modal on successful login
        } else {
          setError(res.data.Message); // Display error to the user
          setErrorVisible(true); // Set error visibility to true
        }
      })
      .catch(err => {
        console.error("Login failed:", err);
        setError('Failed to login. Please try again.'); // Display error to the user
        setErrorVisible(true); // Set error visibility to true
      });
  }

  // Function to handle OTP verification and navigate to home page
  const handleOTPVerified = () => {
    setShowOTPModal(false); // Close OTP modal after successful OTP verification
    navigate('/home');
    console.log("OTP verified, navigating to home page");
  };

  // Clear error and reset error visibility
  useEffect(() => {
    if (!error) {
      setErrorVisible(false); // Set error visibility to false when error is cleared
    }
  }, [error]);

  return (
    <>
      <div className="loginbg">
        <div className={`login-container ${errorVisible ? 'error-visible' : ''}`}>
          <div className='ADMIN'>
            <img src={ADMIN} alt="admin" className="admin" />
            <h2 className='log'>Login</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                id="username"
                placeholder='Enter Username'
                value={username}
                onChange={e => setUsername(e.target.value)} 
                className="input-field" />
            </div>
            <div className="input-container">
              <input
                type="password"
                id="password"
                placeholder='Enter Password'
                value={password}
                onChange={e => setPassword(e.target.value)} 
                className="input-field" />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-container">
              <button className='login-button'><i className="fa fa-sign-in"></i> | Login</button>
            </div>
          </form>
        </div>
      </div>
      {/* OTP modal component */}
      {showOTPModal && (
        <OTPModal
          onVerify={handleOTPVerified} // Pass the function to handle OTP verification
        />
      )}
    </>
  );
}

export default Login;
