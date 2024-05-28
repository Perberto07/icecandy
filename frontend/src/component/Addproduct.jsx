import Sidebar from "../Sidebar"
import './css/Addproduct.css'


function Addproduct() {
  return (
    <>
      <Sidebar />
      <div className='Content'>
      <div className="AddProduct-container">
        <form className="product-form">
          <div className='Product'>
            <label htmlFor="flavor">New Product: </label>
            <input
              type="text"
              id="product"
              placeholder='Enter Product' />
          </div>
            <hr />
          <div className='Price'>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              placeholder='price' />
          </div>
          <hr />
          <button  type='submit'className="Addproduct">Add</button>
        </form>
        </div>
      </div>
    </>
  )
}

export default Addproduct