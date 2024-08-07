import  { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Sidebar from '../Sidebar';
import OTPModal from './OTPModal'; // Import the OTPModal component
import './css/deleteproduct.css';


function Deleteproduct() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const contentRef = useRef(null);

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
    setShowOTPModal(true); // Show OTP modal when delete is clicked
  };

  const handleConfirmDelete = () => {
    // Make API call to delete product after OTP verification
    axios.delete(`http://localhost:8080/product/${selectedProductId}`)
      .then(res => {
        if (res.data.Status === "Success") {
          setProducts(products.filter(product => product.ProductNO !== selectedProductId));
        } else {
          console.error("Error deleting product:", res.data.Message);
        }
      })
      .catch(err => console.error(err));

    // Close OTP modal after deletion
    setShowOTPModal(false);
  };

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
      <div className='Content'  ref={contentRef}>
        <Sidebar />
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
                      <button className='delete-button' onClick={() => handleDeleteClick(product.ProductNO)}><i className="fa fa-trash"></i> Delete</button>
                    </td>
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

      {/* Conditionally render OTP modal */}
      {showOTPModal && (
        <OTPModal
          email="" // Pass email to the OTP modal if needed
          onVerify={handleConfirmDelete} // Handle OTP verification
        />
      )}
    </>
  );
}

export default Deleteproduct;
