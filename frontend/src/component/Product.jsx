import { Link } from 'react-router-dom'
import './css/content.css'
import './css/product.css'
import Sidebar from '../Sidebar'
import product2Image from './images/product2.jpg';

function Product() {
  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className="productlist">
          <img src={product2Image} alt="CLSF3" className="product" />
        </div>
        <div className='option'>
        <h2><Link to="/Product"> <i className="fas fa-info-circle"></i>Product</Link></h2>
        <li><Link to="/Product/Productlist"> <i className="fas fa-plus"></i>Product List</Link></li>
        <li><Link to="/Product/Addproduct"> <i className="fas fa-plus"></i>Add Product</Link></li>
        <li><Link to="/Product/Editproduct"> <i className="fas fa-handshake"></i>Edit Product</Link></li>
        <li><Link to="/Product/Deleteproduct"> <i className="fas fa-handshake"></i>Delete Product</Link></li>
        </div>
      </div>
    </>
  )
}

export default Product