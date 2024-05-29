import { Link } from 'react-router-dom';
import './css/product.css';
import Sidebar from '../Sidebar';

import '@fortawesome/fontawesome-free/css/all.min.css';

function Product() {
  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className='option'>
          <div className='product'>
            <Link to="/Product/Productlist" className='button1'>
              <i className="fas fa-list"></i> Product List
            </Link></div>

          <div className='product'>
            <Link to="/Product/Addproduct" className='button1'>
              <i className="fas fa-plus"></i> Add Product
            </Link>
          </div>

          <div className='product'>
            <Link to="/Product/Editproduct" className='button1'>
              <i className="fas fa-edit"></i> Edit Product
            </Link></div>

          <div className='product'>
            <Link to="/Product/Deleteproduct" className='button1'>
              <i className="fas fa-trash"></i> Delete Product
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
