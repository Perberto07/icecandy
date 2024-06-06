import './css/Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ADMIN from './images/admin.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [errorVisible, setErrorVisible] = useState(false); // State to track error visibility

  axios.defaults.withCredentials = true;

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitting login request with username:", username);

    axios.post('http://localhost:8080/login', { username, password })
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/home');
          console.log("Success");
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
    </>
  );
}

export default Login;
