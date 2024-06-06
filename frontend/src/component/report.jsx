import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/scss/bootstrap.scss";

function Report() {
  const [Products, setProducts] = useState([]);
  const [Transactions, setTransactions] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(''); // State for start date
  const [endDate, setEndDate] = useState(''); // State for end date

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

  const customerMap = Customers.reduce((acc, customer) => {
    acc[customer.CustomerNO] = customer;
    return acc;
  }, {});

  const productMap = Products.reduce((acc, product) => {
    acc[product.ProductNO] = product;
    return acc;
  }, {});

  const filteredTransactions = Transactions.filter(transaction => {
    const transactionDate = new Date(transaction.Date);
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    return (!startDate || transactionDate >= start) && (!endDate || transactionDate <= end);
  });

  const combinedData = filteredTransactions.map(transaction => {
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

  const totalIncome = combinedData.reduce((acc, data) => acc + data.sum, 0); // Calculate total income

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="Content">
        <Sidebar />
        <div className="Content-deleteorder">
          <div className="transaction">
            <div className="filter">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="total-income">
              <h3>Total Income: Php. {totalIncome.toFixed(2)}</h3> {/* Display total income */}
            </div>
            <button className="btn btn-primary" onClick={handlePrint}>Print Report</button> {/* Print button */}
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
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
