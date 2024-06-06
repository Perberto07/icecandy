import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/scss/bootstrap.scss";
import OTPModal from './OTPModal'; // Import the OTPModal component

function Deleteorder() {
  const [Products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [Transactions, setTransactions] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [showOTPModal, setShowOTPModal] = useState(false); // State to control OTP modal

  useEffect(() => {
    axios.get('http://localhost:8080/transaction')
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
      
    axios.get('http://localhost:8080/product')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
      
    axios.get('http://localhost:8080/customer')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
      
    axios.get('http://localhost:8080/order')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (transactionID) => {
    // Set transaction ID to be deleted and show OTP modal
    setTransactionToDelete(transactionID);
    setShowOTPModal(true);
  };

  const handleConfirmDelete = () => {
    // Make API call to delete transaction after OTP verification
    axios.delete(`http://localhost:8080/transaction/${transactionToDelete}`)
      .then(() => {
        setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.transactionID !== transactionToDelete));
        setShowOTPModal(false); // Close OTP modal after deletion
      })
      .catch(err => console.error(err));
  };

  const customerMap = Customers.reduce((acc, customer) => {
    acc[customer.CustomerNO] = customer;
    return acc;
  }, {});

  const productMap = Products.reduce((acc, product) => {
    acc[product.ProductNO] = product;
    return acc;
  }, {});

  const combinedData = Transactions.map(transaction => {
    const customer = customerMap[transaction.CustomerNO] || {};
    const orderItems = Orders.filter(order => order.orderNo === transaction.orderNo).map(order => {
      const product = productMap[order.ProductNO] || {};
      return {
        productFlavor: product.ProductFlavor,
        price: product.Price,
        quantity: order.Quantity
      };
    });

    return {
      transactionID: transaction.transactionID,
      orderNo: transaction.orderNo,
      customerName: customer.Name,
      customerAddress: customer.Address,
      date: transaction.Date,
      sum: transaction.Sum,
      orderItems
    };
  });

  return (
    <>
      <div className="Content">
        <Sidebar />
        <div className="Content-deleteorder">
          <div className="transaction">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Transaction No</th>
                  <th>Order No</th>
                  <th>Customer Name</th>
                  <th>Customer Address</th>
                  <th>Date</th>
                  <th>Sum</th>
                  <th>Product Flavor</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {combinedData.map((data, index) => (
                  data.orderItems.map((item, itemIndex) => (
                    <tr key={`${index}-${itemIndex}`}>
                      {itemIndex === 0 && (
                        <>
                          <td rowSpan={data.orderItems.length}>{data.transactionID}</td>
                          <td rowSpan={data.orderItems.length}>{data.orderNo}</td>
                          <td rowSpan={data.orderItems.length}>{data.customerName}</td>
                          <td rowSpan={data.orderItems.length}>{data.customerAddress}</td>
                          <td rowSpan={data.orderItems.length}>{data.date}</td>
                          <td rowSpan={data.orderItems.length}>{data.sum}</td>
                        </>
                      )}
                      <td>{item.productFlavor}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      {itemIndex === 0 && (
                        <td rowSpan={data.orderItems.length}>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(data.transactionID)}
                          ><i className="fa fa-trash"></i> | Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* OTP modal component */}
      {showOTPModal && (
        <OTPModal
          onVerify={handleConfirmDelete} // Pass the function to handle OTP verification
        />
      )}
    </>
  );
}

export default Deleteorder;
