import './css/content.css'
import Sidebar from "../Sidebar"

function Addorder() {
  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className='mb-2'>
          <label htmlFor="username">Choose Date: </label>
          <input
            type="date"
            id="username"
            placeholder='Enter Username' />
        </div>

        <div className='mb-2'>
          <label htmlFor="product">select product: </label>
          <select name="products" id="products">
            <option value="candy">mango</option>
            <option value="lala">orange</option>
            <option value="unti">milk</option>
          </select>
        </div>

        <div className='mb-2'>
          <label htmlFor="username">Quantity: </label>
          <input
            type="number"
            id="qnty"
            placeholder='how many icecandy' />
        </div>
      </div>
    </>
  )
}

export default Addorder