import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/scss/bootstrap.scss";

function TransactionDetails() {
  const [Products, setProducts] = useState([]);
  const [Transaction, setTransaction] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [Orders, setOrder] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/transaction')
      .then(res => setTransaction(res.data))
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
      .then(res => setOrder(res.data))
      .catch(err => console.error(err));
  }, []);

  // Create a map of customers for easy lookup
  const customerMap = customers.reduce((acc, customer) => {
    acc[customer.CustomerNO] = customer;
    return acc;
  }, {});

  return (
    <>
      <Sidebar />
      <div className="Content">
        <div className="Content">
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
                </tr>
              </thead>
              <tbody>
                {Transaction.map((transaction, index) => {
                  const customer = customerMap[transaction.CustomerNO] || {};
                  return (
                    <tr key={index}>
                      <td>{transaction.transactionID}</td>
                      <td>{transaction.orderNo}</td>
                      <td>{customer.Name}</td>
                      <td>{customer.Address}</td>
                      <td>{transaction.Date}</td>
                      <td>{transaction.Sum}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <hr />

          <div className="orders">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order No</th>
                  <th>Product Flavor</th>
                  <th>Quantiy</th>
                </tr>
              </thead>
              <tbody>
                {Orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.orderNo}</td>
                    <td>{order.ProductNO}</td>
                    <td>{order.Quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="Product">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product Flavor</th>
                  <th>Price</th>s
                </tr>
              </thead>
              <tbody>
                {Products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.ProductFlavor}</td>
                    <td>{product.Price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}

export default TransactionDetails;
