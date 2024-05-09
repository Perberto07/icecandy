import { Link } from "react-router-dom";
import './component/css/Sidebar.css'

function Sidebar() {
  return (
    <>
      
        <div className="sidebar">
          <nav>
            <ul>
              <li><Link to="/Home" className="active"> <i className="fas fa-home"></i> Home</Link></li>
              <li><Link to="/Customer"> <i className="fas fa-info-circle"></i> Customer</Link></li>
              <li><Link to="/Product"> <i className="fas fa-plus"></i> Product</Link></li>
              <li><Link to="/Order"> <i className="fas fa-handshake"></i> Order</Link></li>
              <li><Link to="/Transaction"> <i className="fas fa-money-bill"></i> Transaction</Link></li>
              <li><Link to="/Settings"> <i className="fas fa-cog"></i> Settings</Link></li>
              <li><Link to="/"> <i className="fas fa-sign-out-alt"></i> Logout</Link></li>
            </ul>
          </nav>
        </div>
      
    </>
  );
}

export default Sidebar;
