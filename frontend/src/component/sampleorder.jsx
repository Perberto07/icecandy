import Sidebar from "../Sidebar"
import './css/Addproduct.css'
import { useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";


function SampleOrder() {
  const [OrderNo, setProductFlavor] = useState('');
  const [ProductNO, setPrice] = useState('');
  const [Quantity, setQuantity] = useState('');
  //const navigate=useNavigate('');
  

 
  function handleSubmit(event) {
    event.preventDefault();
    // Validation: Check if all fields are filled
    if (!OrderNo || !ProductNO) {
      alert("All fields are required!");
      return;
    }
    axios.post('http://localhost:8080/addorder', { OrderNo, ProductNO, Quantity})
      .then(res => {
      console.log(res);
      
      }).catch(err => console.log(err));
  }
  return (
    <>
      <Sidebar />
      <div className='Content'>
      <div className="AddProduct-container overflow scroll">
        <form onSubmit={handleSubmit}>
          <div className='order'>
            <label htmlFor="flavor">New Product: </label>
            <input
              type="text"
              id="product"
              placeholder='Enter order' 
              value={OrderNo}
                onChange={e => setProductFlavor(e.target.value)}/>
          </div>
            <hr />
          <div className='Price'>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              placeholder='price' 
              value={ProductNO}
                onChange={e => setPrice(e.target.value)}/>
          </div>
          <hr />
          <div className='Price'>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              placeholder='Quantity' 
              value={Quantity}
                onChange={e => setQuantity(e.target.value)}/>
          </div>
          <button  type='submit'className="Addproduct">Add</button>
        </form>
        </div>
      </div>
    </>
  )
}

export default SampleOrder