import {Link} from 'react-router-dom'
function Product() {
  return (
    <>
    <div>
      <h2><Link to="/Product"> <i className="fas fa-info-circle"></i>Product</Link></h2>
      <li><Link to="/Product/Addproduct"> <i className="fas fa-plus"></i>Add Product</Link></li>
      <li><Link to="/Product/Editproduct"> <i className="fas fa-handshake"></i>Edit Product</Link></li>
    </div>
    </>
  )
}

export default Product