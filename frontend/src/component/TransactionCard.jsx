import React from 'react';
import { Link } from 'react-router-dom';
import './css/TransactionCard.css';
import logo from '../images/icecandy.jpg'; // Import your logo image

function TransactionCard({ transaction }) {
  const handlePrint = () => {
    const printableContent = document.getElementById(`transaction-card-${transaction.transactionID}`).innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      .transaction-card {
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin: 20px;
        padding: 20px;
      }
      
      .transaction-header {
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        padding-bottom: 10px;
      }
      
      .transaction-header h4 {
        margin: 0;
      }
      
      .transaction-body {
        padding: 10px 0;
      }
      
      .transaction-body p {
        margin: 5px 0;
      }
      
      .table {
        width: 100%;
        margin-top: 16px;
        border-collapse: collapse;
      }
      
      .table th, .table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      
      .table-striped tbody tr:nth-of-type(odd) {
        background-color: #f2f2f2;
      }
      
      .print-button {
        margin-top: 16px;
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .print-button:hover {
        background-color: #0056b3;
      }

      .transaction table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      .transaction th, .transaction td {
        padding: 12px 15px;
        text-align: left;
      }

      .transaction th {
        background-color: #007bff;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .transaction tbody tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      .transaction tbody tr:hover {
        background-color: #e9e9e9;
      }

      .transaction .btn-danger {
        margin: 10px 0;
        padding: 8px 12px;
        background-color: #dc3545;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }

      .transaction .btn-danger:hover {
        background-color: #c82333;
      }

      .header-content {
        display: flex;
        align-items: center;
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

      .header-spacing {
        margin-bottom: 20px; /* Adjust the value as needed */
      }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="transaction-card transaction">');
    printWindow.document.write(printableContent);
    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div id={`transaction-card-${transaction.transactionID}`} className="transaction-card transaction">
      <div className="transaction-header header-spacing">
        <Link to="/Home" className="header-content">
          <img src={logo} alt="Logo" className="icecandy-logo" />
          <h1 className="brandname">Delicious Ice Candy</h1>
        </Link>
        <h4>Transaction No: {transaction.transactionID}</h4>
        <p>Order No: {transaction.orderNo}</p>
      </div>
      <div className="transaction-body">
        <p><strong>Customer Name:</strong> {transaction.customerName}</p>
        <p><strong>Customer Address:</strong> {transaction.customerAddress}</p>
        <p><strong>Date:</strong> {formatDate(transaction.date)}</p>
        <p><strong>Sum:</strong> {transaction.sum}</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Flavor</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {transaction.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productFlavor}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="print-button" onClick={handlePrint}><i className="fa fa-print"></i> | Print </button>
    </div>
  );
}

export default TransactionCard;
