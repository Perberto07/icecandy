import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import './css/order.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Order() {
  return (
    <>
      <Sidebar />
      <div className="Content">
        <div className='option'>
          <h2>
            <Link to="/Order">
              <i className="fas fa-info-circle"></i> Order
            </Link>
          </h2>
          <ul>
            <li>
              <Link to="/Order/Transactiondetail">
                <i className="fas fa-list"></i> Order List
              </Link>
            </li>
            <li>
              <Link to="/Order/Addorder">
                <i className="fas fa-plus"></i> Add Order
              </Link>
            </li>
            <li>
              <Link to="/Order/Editorder">
                <i className="fas fa-edit"></i> Edit Order
              </Link>
            </li>
            <li>
              <Link to="/Order/Deleteorder">
                <i className="fas fa-trash"></i> Delete Order
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Order;
