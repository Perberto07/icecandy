import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
 // Assuming you have a CSS file for additional styling

function Productlist() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/product')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.ProductFlavor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search by flavor...'
            value={searchQuery}
            onChange={handleSearch}
            className='search-input'
          />
        </div>
        <div className='col-md-9 bg-dark bg-opacity-100 d-flex justify-content-center align-items-center'>
          <div className='w-200 h-90 bg-white rounded p-4'>
            <table className='table'>
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
