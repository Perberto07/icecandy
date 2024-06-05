import { useState, useEffect } from 'react';
import './css/addorder.css';
import Sidebar from "../Sidebar";
import axios from 'axios';

function AddOrder() {
  const [products, setProducts] = useState([{ id: 1, product: '', quantity: '', price: '', saved: false }]);
  const [customers, setCustomers] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [total, setTotal] = useState(0);
  const [orderNo, setOrderNo] = useState('');
  const [date, setDate] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/customer')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:8080/product')
      .then(res => setProductList(res.data))
      .catch(err => console.error(err));

    // Set date to current date
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  useEffect(() => {
    let sum = 0;
    products.forEach(product => {
      const subtotal = parseFloat(product.price) * parseInt(product.quantity);
      sum += isNaN(subtotal) ? 0 : subtotal;
    });
    setTotal(sum);
  }, [products]);

  useEffect(() => {
    if (date && selectedCustomer) {
      const formattedDate = date.replace(/-/g, '');
      const orderNumber = `${formattedDate}${selectedCustomer}`;
      setOrderNo(orderNumber);
    }
  }, [date, selectedCustomer]);

  const addProductField = () => {
    setProducts([...products, { id: products.length + 1, product: '', quantity: '', price: '', saved: false }]);
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
    newProducts[index].saved = false; // Reset saved status if product changes
    setProducts(newProducts);
  };

  const handleQuantityChange = (index, quantity) => {
    const newProducts = [...products];
    newProducts[index].quantity = quantity;
    newProducts[index].saved = false; // Reset saved status if quantity changes
    setProducts(newProducts);
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const saveProduct = (productIndex) => {
    const product = products[productIndex];
    const transactionData = {
      ProductNO: product.product,
      OrderNo: orderNo,
      Quantity: product.quantity
    };

    axios.post('http://localhost:8080/addorder', transactionData)
      .then(res => {
        console.log('Product saved:', res.data);
        setSubmissionStatus('Product successfully saved!');
        const newProducts = [...products];
        newProducts[productIndex].saved = true; // Mark product as saved
        setProducts(newProducts);
        // Call saveTransaction after saving the last product
        if (productIndex === products.length - 1) {
          saveTransaction();
        }
      })
      .catch(err => {
        console.error('Error saving product:', err);
        setSubmissionStatus('Failed to save product.');
      });
  };

  const saveTransaction = () => {
    const transactionData = {
      OrderNo: orderNo,
      CustomerNO: selectedCustomer,
      Sum: total,
      Date: date
    };

    axios.post('http://localhost:8080/addtransaction', transactionData)
      .then(res => {
        console.log('Transaction saved:', res.data);
        setSubmissionStatus('Transaction successfully saved!');
      })
      .catch(err => {
        console.error('Error saving transaction:', err);
        setSubmissionStatus('Failed to save transaction.');
      });
  };

  const handleSaveTransaction = () => {
    if (window.confirm('Are you sure you want to submit the transaction?')) {
      saveTransaction();
    }
  };

  const allProductsSaved = products.every(product => product.saved);

  const isFieldEmpty = (field) => field.trim() === '';

  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className='Content2'>
          <div className="order-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='customer-field'>
                <div className='orderNo'>
                  <h3>Order No: {orderNo}</h3>
                </div>
                <div className='date'>
                  <label htmlFor="date">
                    Date
                    {isFieldEmpty(date) && <span className="red-asterisk">*</span>}
                  </label>
                  <input
                    type="date"
                    id="date"
                    className='date-input'
                    placeholder='Date'
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
                <div className='customer-address'>
                  <label htmlFor="customer">
                    Customer
                    {isFieldEmpty(selectedCustomer.toString()) && <span className="red-asterisk">*</span>}
                  </label>
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
              
              {products.map((product, index) => (
                <div key={product.id} className='product-quantity'>
                  {index === 0 && (
                    <button type="button" className="add-button" onClick={addProductField}>+</button>
                  )}
                  <div>
                    <label htmlFor={`product-${product.id}`}>
                      Product
                      {isFieldEmpty(product.product) && <span className="red-asterisk">*</span>}
                    </label>
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
                    <label htmlFor={`quantity-${product.id}`}>
                      Quantity
                      {isFieldEmpty(product.quantity) && <span className="red-asterisk">*</span>}
                    </label>
                    <input
                      type="number"
                      id={`quantity-${product.id}`}
                      className='form-control'
                      placeholder='Quantity'
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
                      value={orderNo}
                      readOnly
                    />
                  </div>
                  <div className="button-container">
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      X
                    </button>
                    <button
                      type="button"
                      className="save-button"
                      onClick={() => saveProduct(index)}
                      disabled={product.saved}
                    >
                      {product.saved ? 'Saved' : 'Save'}
                    </button>
                    
                  </div>
                </div>
              ))}
               
              <button 
                type="button"
                className="save-transaction-button"
                onClick={handleSaveTransaction}
                disabled={!allProductsSaved || products.length === 0}
              >
                Submit Transaction
              </button>
             
              <p className='Total'>Total: Php {total.toFixed(2)}</p>
              {submissionStatus && <p>{submissionStatus}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrder;
