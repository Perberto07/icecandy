import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import './css/productlist.css'; // Import the CSS file for styling

function Productlist() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/product')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  
  const filteredProducts = products.filter(product =>
    product.ProductFlavor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className='product-list-container'>
          
          <hr />
          <div className='product-list-heading'>
            <table className='product-list-table'> {/* Add product-list-table class */}
              <thead>
                <tr>
                  <th>Product No.</th>
                  <th>Product Flavor</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.ProductNO}</td>
                    <td>{product.ProductFlavor}</td>
                    <td>{product.Price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Productlist;
