import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import './css/transaction.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Transaction() {
  return (
    <>
      <div className="Content">
        <Sidebar /> 
        <div className="transac">
          <ul>
            <li>
              <Link to="/order-history" className="button">
                <i className="fas fa-history"></i> Order History
              </Link>
            </li>
            <li>
              <Link to="/returns" className="button">
                <i className="fas fa-undo"></i> Returns
              </Link>
            </li>
            <li>
              <Link to="/canceled" className="button">
                <i className="fas fa-times-circle"></i> Canceled
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Transaction;
