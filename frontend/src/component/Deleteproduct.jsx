import Sidebar from '../Sidebar'
import './css/content.css'

function Deleteproduct() {
  return (
    <>
      <Sidebar />
      <div className="Content">
        <div className="Content">
          <div className='mb-2'>
            <label htmlFor="username">Search: </label>
            <input
              type="search"
              id="product"
              placeholder='Enter Product or Flavor' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Deleteproduct