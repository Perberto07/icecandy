import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import './css/editproduct.css'
import { useNavigate } from 'react-router-dom';

function Editproduct() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ ProductNO: '', ProductFlavor: '', Price: '' });
  const navigate = useNavigate(); // Call useNavigate here

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

  const handleEditClick = (product) => {
    setEditingProduct(product.ProductNO);
    setEditForm({ ...product });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSaveClick = () => {
    axios.put(`http://localhost:8080/product/${editingProduct}`, editForm)
      .then(res => {
        setProducts(products.map(product =>
          product.ProductNO === editingProduct ? { ...product, ...editForm } : product
        ));
        setEditingProduct(null);
        navigate('/Product/Editproduct'); // Navigate to a different route if necessary
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className=''>
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
          <div className='col-md-9 bg-dark bg-opacity-100 d-flex justify-content-center align-items-center'>
            <div className='w-200 h-90 bg-white rounded p-4'>
              <table className='table'>
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
                        <button onClick={() => handleEditClick(product)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editingProduct && (
                <div className='edit-form'>
                  <h3>Edit Product</h3>
                  <input
                    type='text'
                    name='ProductFlavor'
                    value={editForm.ProductFlavor}
                    onChange={handleFormChange}
                    placeholder='Product Flavor'
                  />
                  <input
                    type='number'
                    name='Price'
                    value={editForm.Price}
                    onChange={handleFormChange}
                    placeholder='Price'
                  />
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editproduct;
