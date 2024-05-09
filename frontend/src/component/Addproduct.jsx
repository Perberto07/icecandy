import './css/content.css'
import Sidebar from "../Sidebar"


function Addproduct() {
  return (
    <>
    <Sidebar/>
    <div className='Content'>
      
    <div className='mb-2'>
          <label htmlFor="username">New Product: </label>
          <input
            type="text"
            id="product"
            placeholder='Enter Product' />
        </div>

        <div className='mb-2'>
          <label htmlFor="username">Price: </label>
          <input
            type="number"
            id="price"
            placeholder='price' />
        </div>
    </div>
    </>
  )
}

export default Addproduct