import Sidebar from "../Sidebar"
import './css/Addproduct.css'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Addproduct() {
  const [ProductFlavor, setProductFlavor] = useState('');
  const [Price, setPrice] = useState('');
  const navigate = useNavigate('');



  function handleSubmit(event) {
    event.preventDefault();
    // Validation: Check if all fields are filled
    if (!ProductFlavor || !Price) {
      alert("All fields are required!");
      return;
    }
    axios.post('http://localhost:8080/addproduct', { ProductFlavor, Price })
      .then(res => {
        console.log(res);
        navigate('/Product/Productlist');
      }).catch(err => console.log(err));
  }
  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className="AddProduct-container">
          <form onSubmit={handleSubmit}>
            <div className='Product'>
              <label htmlFor="flavor">New Product: </label>
              <input
                type="text"
                id="product"
                placeholder='Enter Product'
                value={ProductFlavor}
                onChange={e => setProductFlavor(e.target.value)} />
            </div>
            <hr />
            <div className='Price'>
              <label htmlFor="price">Price: </label>
              <input
                type="number"
                id="price"
                placeholder='price'
                value={Price}
                onChange={e => setPrice(e.target.value)} />
            </div>
            <hr />
            <button type='submit' className="add-button">
              <i className="icon fas fa-plus"></i>
              <span>Add</span>
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default Addproduct