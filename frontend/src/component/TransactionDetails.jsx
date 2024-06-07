import  { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import TransactionCard from "./TransactionCard";
import "./css/transactiondetails.css";

function TransactionDetails() {
  const [Products, setProducts] = useState([]);
  const [Transactions, setTransactions] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [Orders, setOrders] = useState([]);
  const contentRef = useRef(null);


  useEffect(() => {
    axios.get("http://localhost:8080/transaction")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/customer")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/order")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const customerMap = Customers.reduce((acc, customer) => {
    acc[customer.CustomerNO] = customer;
    return acc;
  }, {});

  const productMap = Products.reduce((acc, product) => {
    acc[product.ProductNO] = product;
    return acc;
  }, {});

  const combinedData = Transactions.map((transaction) => {
    const customer = customerMap[transaction.CustomerNO] || {};
    const orderItems = Orders.filter(
      (order) => order.orderNo === transaction.orderNo
    ).map((order) => {
      const product = productMap[order.ProductNO] || {};
      return {
        productFlavor: product.ProductFlavor,
        price: product.Price,
        quantity: order.Quantity,
      };
    });

    return {
      transactionID: transaction.transactionID,
      orderNo: transaction.orderNo,
      customerName: customer.Name,
      customerAddress: customer.Address,
      date: transaction.Date,
      sum: transaction.Sum,
      orderItems,
    };
  });

  const scrollToTop = () => {
    if (contentRef.current) {
        contentRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

  return (
    <div className="Content" ref={contentRef}>
      <Sidebar />
      <div className="Content-orderlist">
        <div className="transaction">
          {/* Render transaction cards */}
          {combinedData.map((transaction, index) => (
            <TransactionCard
              key={index}
              transaction={transaction}
              className="transaction-card"
            />
          ))}
        </div>
      </div>
      {/* Back to Top button */}
      <button onClick={scrollToTop} className="back-to-top">
        Back to Top
      </button>
    </div>
  );
}

export default TransactionDetails;
