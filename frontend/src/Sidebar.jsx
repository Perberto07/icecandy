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
            <li><Link to="/Home" className="active"> Home</Link></li>
            <li><Link to="/Customer"> Customer</Link></li>
            <li><Link to="/Product">Product</Link></li>
            <li><Link to="/Order"> Order</Link></li>
            <li><Link to="/Transaction">Transaction</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
