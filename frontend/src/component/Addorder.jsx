import { useState, useEffect } from 'react';
import './css/addorder.css';
import Sidebar from "../Sidebar";
import axios from 'axios';

function AddOrder() {
  const [products, setProducts] = useState([{ id: 1, product: '', quantity: '', price: '' }]);
  const [customers, setCustomers] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const [ProductFlavor, setProductFlavor] = useState('');
  const [Price, setPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/customer')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:8080/product')
      .then(res => setProductList(res.data))
      .catch(err => console.error(err));
  }, []);

  const addProductField = () => {
    setProducts([...products, { id: products.length + 1, product: '', quantity: '', price: '' }]);
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

  const handleProductChange = (index, productId) => {
    const selectedProduct = productList.find(p => p.ProductNO === parseInt(productId));
    const newProducts = [...products];
    newProducts[index].product = productId;
    newProducts[index].price = selectedProduct ? selectedProduct.Price : '';
    setProducts(newProducts);
  };

  const handleQuantityChange = (index, quantity) => {
    const newProducts = [...products];
    newProducts[index].quantity = quantity;
    setProducts(newProducts);
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className='Content2'>
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
                <div>
                  <label htmlFor={`product-${product.id}`}>Select Product</label>
                  <select
                    name={`products-${product.id}`}
                    id={`products-${product.id}`}
                    className='select-product'
                    value={product.product}
                    onChange={(e) => handleProductChange(index, e.target.value)}
                  >
                    <option value="">Select Product</option>
                    {productList.map(productItem => (
                      <option key={productItem.ProductNO} value={productItem.ProductNO}>
                        {productItem.ProductFlavor}
                      </option>
                      
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`price-${product.id}`}>Price</label>
                  <input
                    type="text"
                    id={`price-${product.id}`}
                    className='form-control'
                    placeholder='Price'
                    value={product.price}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor={`quantity-${product.id}`}>Quantity</label>
                  <input
                    type="number"
                    id={`quantity-${product.id}`}
                    className='form-control'
                    placeholder='Enter Quantity'
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`orderNo-${product.id}`}>Order No.</label>
                  <input
                    type="text"
                    id={`orderNo-${product.id}`}
                    className='orderNo-input'
                    placeholder='Order No'
                  />
                </div>
                <button className="remove-button" onClick={() => handleRemoveProduct(product.id)}>X</button>
              </div>
            ))}
            <hr />
            <p className='Total'>Total</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrder;
