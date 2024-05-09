import { Link } from "react-router-dom"
import './css/content.css'
import Sidebar from "../Sidebar"
import './css/order.css'

function Order() {
  return (
    <>
      <Sidebar />
      <div className="Content">
        <div className='option'>
          <h2><Link to="/Order"> <i className="fas fa-info-circle"></i>Order</Link></h2>
          <li><Link to="/Order/Addorder"> <i className="fas fa-plus"></i>Add Order</Link></li>
          <li><Link to="/Order/Editorder"> <i className="fas fa-handshake"></i>Edit Order</Link></li>
          <li><Link to="/Order/Deleteorder"> <i className="fas fa-handshake"></i>Delete Order</Link></li>
        </div>

      </div>
    </>
  )
}

export default Order