import { Link } from "react-router-dom";
import './css/Login.css'

function Login() {
  return (
    <>
    <div className="loginbg">
      <div className="login-container">
        <h2>Login</h2>
        <div className="input-container">
          <input type="text" placeholder="Username" className="input-field" />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Password" className="input-field" />
        </div>
        <div className="button-container">
          <Link to="/Home">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;
