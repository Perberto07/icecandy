import { Link } from 'react-router-dom';
import './css/product.css';
import Sidebar from '../Sidebar';
import product2Image from './images/product2.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Product() {
  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className="productlist">
          <img src={product2Image} alt="CLSF3" className="product" />
        </div>
        <div className='option'>
          <h2>
            <Link to="/Product">
              <i className="fas fa-info-circle"></i> Product
            </Link>
          </h2>
          <ul>
            <li>
              <Link to="/Product/Productlist">
                <i className="fas fa-list"></i> Product List
              </Link>
            </li>
            <li>
              <Link to="/Product/Addproduct">
                <i className="fas fa-plus"></i> Add Product
              </Link>
            </li>
            <li>
              <Link to="/Product/Editproduct">
                <i className="fas fa-edit"></i> Edit Product
              </Link>
            </li>
            <li>
              <Link to="/Product/Deleteproduct">
                <i className="fas fa-trash"></i> Delete Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Product;
