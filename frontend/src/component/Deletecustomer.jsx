import './css/content.css'
import Sidebar from "../Sidebar"

function Deletecustomer() {
  return (
    <>
    <Sidebar/>
    <div className="Content">
    <div className='mb-2'>
          <label htmlFor="username">Search Customer: </label>
          <input
            type="search"
            id="username"
            placeholder='Enter Customer' />
        </div>
    </div>
    </>
  )
}

export default Deletecustomer