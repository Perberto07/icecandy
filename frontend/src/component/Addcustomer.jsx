import './css/content.css'
import Sidebar from "../Sidebar"

function Addcustomer() {
  return (
    <><Sidebar />
      <div className="Content">
        <div>

        <div className='mb-2'>
          <label htmlFor="username">Customer Name: </label>
          <input
            type="text"
            id="username"
            placeholder='Enter Customer Name'
          />
        </div>


        <div className='mb-2'>
          <label htmlFor="username">Enter Address: </label>
          <input
            type="text"
            id="username"
            placeholder='Enter Address'/>
        </div>

        <div className='mb-2'>
          <label htmlFor="username">Store Name: </label>
          <input
            type="text"
            id="username"
            placeholder='Enter Store Name'/>
        </div>

        </div>
      </div>
    </>
  )
}

export default Addcustomer