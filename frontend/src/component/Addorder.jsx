import './css/content.css'
import './css/addorder.css'
import Sidebar from "../Sidebar"

function AddOrder() {
  return (
    <>
    <Sidebar />
    <div className='Content'>
    <div className="container">
      
      <div className='content'>
        <div className='form-group'>
          <label htmlFor="date">Choose Date:</label>
          <input
            type="date"
            id="date"
            className='form-control'
            placeholder='Select Date'
          />
        </div>

        <div className='form-group'>
          <label htmlFor="product">Select Product:</label>
          <select name="products" id="products" className='form-control'>
            <option value="mango">Mango</option>
            <option value="orange">Orange</option>
            <option value="milk">Milk</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className='form-control'
            placeholder='Enter Quantity'
          />
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default AddOrder
