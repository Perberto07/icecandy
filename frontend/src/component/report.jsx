import  { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import "bootstrap/scss/bootstrap.scss";
import './css/report.css'; // Assuming you have a CSS file for report styling
import logo from '../images/icecandy.jpg'; // Import your logo image

function Report() {
  const [Products, setProducts] = useState([]);
  const [Transactions, setTransactions] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const contentRef = useRef(null);

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

  const totalIncome = combinedData.reduce((acc, data) => acc + data.sum, 0);

  const handlePrint = () => {
    const printContent = document.getElementById('printable-report').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Report</title>');
    printWindow.document.write('<style>');
    // Add the styles you want to apply to the printout
    printWindow.document.write(`
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      .report-container {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        background-color: #f9f9f9;
      }
      .report-header {
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
      }
      .header-content {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .icecandy-logo {
        width: 50px; /* Adjust the size to match the text height */
        height: auto;
        margin-right: 10px;
      }
      .brandname {
        font-size: 24px;
        margin: 0;
      }
      .total-income {
        margin: 20px 0;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
      }
      .table th, .table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      .table th {
        background-color: #007bff;
        color: white;
      }
      .table-striped tbody tr:nth-of-type(odd) {
        background-color: #f2f2f2;
      }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(`
      
    `);
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };
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
      <div className="Content" >
        <Sidebar />
        <div className="Content-deleteorder" ref={contentRef}>
          <div id="printable-report" className="report-container"> {/* Add report-container class */}
            <div className="report-header">
              <div className="header-content">
                <img src={logo} alt="Company Logo" className="icecandy-logo" />
                <h1 className="brandname">Delicious Ice Candy</h1>
              </div>
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
                <h3>Total Income: Php. {totalIncome.toFixed(2)}</h3>
              </div>
            </div>
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
            <button className="btn btn-primary print-button" onClick={handlePrint}><i className="fa fa-print"></i>Print Report</button> {/* Print button */}
          </div>
          <button className="back-to-top" onClick={scrollToTop}>Back to Top</button>
        </div>
        
      </div>
    </>
  );
}

export default Report;
