import { useState, useEffect } from 'react';
import './css/addorder.css';
import Sidebar from "../Sidebar";
import axios from 'axios';

function AddOrder() {
  const [products, setProducts] = useState([{ id: 1, product: '', quantity: '' }]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/customer')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const addProductField = () => {
    setProducts([...products, { id: products.length + 1, product: '', quantity: '' }]);
  };

  const handleCustomerChange = (e) => {
    const customerId = parseInt(e.target.value, 10);
    setSelectedCustomer(customerId);
    const customer = customers.find(c => c.CustomerNO === customerId);
    if (customer) {
      setSelectedAddress(customer.Address);
    } else {
      setSelectedAddress('');
    }
  };

  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className="order-container">
          <div className='customer-field'>
            <div className='orderNo'>
              <h3>Order No: </h3>
            </div>
            <div className='date'>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className='date-input'
                placeholder='Date'
              />
            </div>
            <div className='customer-address'>
              <label htmlFor="customer">Customer</label>
              <select
                id="customer"
                className='customer-input'
                value={selectedCustomer}
                onChange={handleCustomerChange}
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.CustomerNO} value={customer.CustomerNO}>
                    {customer.Name}
                  </option>
                ))}
              </select>

              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className='address-input'
                placeholder='Address'
                value={selectedAddress}
                readOnly
              />
            </div>
          </div>
          <hr />
          {products.map((product, index) => (
            <div key={product.id} className='product-quantity'>
              {index === 0 && (
                <button className="add-button" onClick={addProductField}>+</button>
              )}
              <hr className='line'/>
              <div className='product'>
                <label htmlFor={`product-${product.id}`}>Select Product</label>
                <select
                  name={`products-${product.id}`}
                  id={`products-${product.id}`}
                  className='select-product'
                >
                  <option value="mango">Mango</option>
                  <option value="orange">Orange</option>
                  <option value="milk">Milk</option>
                </select>
              </div>
              <div className='quantity'>
                <label htmlFor={`quantity-${product.id}`}>Quantity</label>
                <input
                  type="number"
                  id={`quantity-${product.id}`}
                  className='form-control'
                  placeholder='Enter Quantity'
                />
              </div>
            </div>
          ))}
          <hr />
          <p className='Total'>Total</p>
        </div>
      </div>
    </>
  );
}

export default AddOrder;
