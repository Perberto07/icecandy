import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Modal from './Modal'; // Assuming you have a Modal component for confirmation
import './css/deleteproduct.css';



function Deleteproduct() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/product')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8080/product/${selectedProductId}`)
      .then(res => {
        if (res.data.Status === "Success") {
          setProducts(products.filter(product => product.ProductNO !== selectedProductId));
        } else {
          console.error("Error deleting product:", res.data.Message);
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setShowModal(false);
        setSelectedProductId(null);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  const filteredProducts = products.filter(product =>
    product.ProductFlavor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className='Content3'>
          <div className='search-container'>
            <input
              type='text'
              placeholder='Search by flavor...'
              value={searchQuery}
              onChange={handleSearch}
              className='search-input'
            />
          </div>
          <hr />
          <div className='delete-product-container'>
            <table className='delete-product-table'>
              <thead>
                <tr>
                  <th>Product No.</th>
                  <th>Product Flavor</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{product.ProductNO}</td>
                    <td>{product.ProductFlavor}</td>
                    <td>{product.Price}</td>
                    <td>
                      <button className='delete-button' onClick={() => handleDeleteClick(product.ProductNO)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />
    </>
  );
}

export default Deleteproduct;
