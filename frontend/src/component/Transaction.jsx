import { Link } from "react-router-dom"
import './css/content.css'
import Sidebar from "../Sidebar"
function Transaction() {
  return (
    <>
      <Sidebar />
      <div className="Content">
        <Link><li>order history</li></Link>
        <Link><li>returns</li></Link>
        <Link><li>Canceled</li></Link>
      </div>
    </>
  )
}

export default Transaction