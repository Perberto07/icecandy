import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/scss/bootstrap.scss";

function EditOrder() {
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

  // Handle the edit button click
  const handleEdit = (transactionID) => {
    console.log(`Edit transaction ${transactionID}`);
    // Implement the edit functionality here
  };

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
                            className="btn btn-primary"
                            onClick={() => handleEdit(data.transactionID)}
                          >
                            Edit
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
    </>
  );
}

export default EditOrder;
