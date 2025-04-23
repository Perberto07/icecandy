import  { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Sidebar from '../Sidebar';
import './css/productlist.css'; // Import the CSS file for styling

function Productlist() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);


  const filteredProducts = products.filter(product =>
    product.ProductFlavor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const scrollToTop = () => {
    if (contentRef.current) {
        contentRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

  return (
    <>
      <div className='Content' ref={contentRef} >
        <Sidebar />
        <div className='product-list-container'>
          <div className='product-list-heading'>
            <table className='product-list-table'> {/* Add product-list-table class */}
              <thead>
                <tr>
                  <th>Product Flavor</th>
                  <th>Price</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.ProductFlavor}</td>
                    <td>{product.Price}</td>
                    <td>{product.image}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Back to Top button */}
      <button onClick={scrollToTop} className="back-to-top">
        Back to Top
      </button>
      </div>
    </>
  );
}

export default Productlist;
