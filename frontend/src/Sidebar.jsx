import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">
                    <nav>
                        <ul>
                            <li><Link to="/Home" className="active"> <i className="fas fa-home"></i> Home</Link></li>
                            <li><Link to="/Cusomer"> <i className="fas fa-info-circle"></i> Customer</Link></li>
                            <li><Link to="/Product"> <i className="fas fa-plus"></i> Product</Link></li>
                            <li><Link to="/Order"> <i className="fas fa-handshake"></i>Order</Link></li>
                            <li><Link to="/Settings"> <i className="fas fa-envelope"></i> Setting</Link></li>
                            <li><Link to="/"> <i className="fas fa-code-branch"></i> Logout</Link></li>
                        </ul>
                    </nav>
                </div>
  )
}

export default Sidebar