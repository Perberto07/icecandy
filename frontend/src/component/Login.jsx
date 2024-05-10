import './css/Login.css'
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  axios.defaults.withCredentials = true;
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitting login request with username:", username);

    axios.post('http://localhost:8080/login', { username, password })
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/home')
          console.log("Success")
        } else {
          alert(res.data.Message)
        }
      })
      .catch(err => {
        console.error("Login failed:", err);
        setError('Failed to login. Please try again.',error); // Display error to the user
      });
  }

  return (
    <>
      <div className="loginbg">
        <div className="login-container">
          <h2>Login</h2>
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
                type="password" // Changed type to password
                id="password"
                placeholder='Enter Password'
                value={password}
                onChange={e => setPassword(e.target.value)} 
                className="input-field" />
            </div>
            <div className="button-container">
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

