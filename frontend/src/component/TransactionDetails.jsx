import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/scss/bootstrap.scss";
import './css/transactiondetails.css';
import TransactionCard from './TransactionCard';

function TransactionDetails() {
  const [Products, setProducts] = useState([]);
  const [Transactions, setTransactions] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/transaction')
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/product')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/customer')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/order')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  // Create a map of customers for easy lookup
  const customerMap = Customers.reduce((acc, customer) => {
    acc[customer.CustomerNO] = customer;
    return acc;
  }, {});

  // Create a map of products for easy lookup
  const productMap = Products.reduce((acc, product) => {
    acc[product.ProductNO] = product;
    return acc;
  }, {});

  // Create a combined data structure
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
        <div className="Content-orderlist">
          <div className="transaction">
            {combinedData.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} className="transaction-card" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionDetails;
