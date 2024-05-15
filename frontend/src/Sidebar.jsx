import { Link } from "react-router-dom";
import './component/css/Sidebar.css';
import Header from "./Header";

function Sidebar() {
  return (
    <>
      <Header/>
      <div className="sidebar">
        <nav>
          <ul>
            <li><Link to="/Home" className="active"> <i className="bi bi-house-door"></i> Home</Link></li>
            <li><Link to="/Customer"> <i className="bi bi-info-circle"></i> Customer</Link></li>
            <li><Link to="/Product"> <i className="bi bi-plus-circle"></i> Product</Link></li>
            <li><Link to="/Order"> <i className="bi bi-handshake"></i> Order</Link></li>
            <li><Link to="/Transaction"> <i className="bi bi-cash-stack"></i> Transaction</Link></li>
            <li><Link to="/"> <i className="bi bi-box-arrow-right"></i> Logout</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
