import './css/content.css'
import Sidebar from "../Sidebar"
import './css/addcustomer.css'

function Addcustomer() {
  return (
    <><Sidebar />
      <div className="Content">
        <div className='Content2'>

          <div className='one'>
            <label htmlFor="username">Customer Name: </label>
            <input
              type="text"
              id="username"
              placeholder='Enter Customer Name'
            />
          </div>

          <hr />
          <div className='two'>
            <label htmlFor="username">Enter Address: </label>
            <input
              type="text"
              id="username"
              placeholder='Enter Address' />
          </div>
          <hr />
          <div className='three'>
            <label htmlFor="username">Store Name: </label>
            <input
              type="text"
              id="username"
              placeholder='Enter Store Name' />
          </div>

        </div>
      </div>
    </>
  )
}

export default Addcustomer