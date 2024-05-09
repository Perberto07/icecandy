import { Link } from "react-router-dom"
import './css/content.css'
import Sidebar from "../Sidebar"
import './css/transaction.css'

function Transaction() {
  return (
    <>
      <Sidebar />
      <div className="Content">
        <div className="transac">
          <ul>
            <li>
              <Link to="/order-history" className="button">Order History</Link>
            </li>
            <li>
              <Link to="/returns" className="button">Returns</Link>
            </li>
            <li>
              <Link to="/canceled" className="button">Canceled</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Transaction