import { Link } from "react-router-dom"
function Login() {
  return (
    <>
      <div>
        <input type="text"></input>
        <input type="password"></input>
      </div>
      <div>
        <Link to="/Home"><button>login</button></Link>
      </div>
    </>
  )
}

export default Login