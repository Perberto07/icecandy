import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import './css/content.css'

function Customer() {
  return (
    <>
    <Sidebar/>
    <div className="Content">
    <h2><Link to="/Customer"> <i className="fas fa-info-circle"></i>Customer</Link></h2>
    <li><Link to="/Customer/Addcustomer"> <i className="fas fa-plus"></i>Add Customer</Link></li>
    <li><Link to="/Customer/Editcustomer"> <i className="fas fa-handshake"></i>Edit Customer</Link></li>
    <li><Link to="/Customer/Deletecustomer"> <i className="fas fa-handshake"></i>Delete Customer</Link></li>
  </div>
  </>
  )
}

export default Customer