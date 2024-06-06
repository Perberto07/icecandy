import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/scss/bootstrap.scss";

function EditOrder() {
  const [Products, setProducts] = useState([]);
  const [Transactions, setTransactions] = useState([]);
  const [Customers, setCustomers] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(null); // Track which transaction is being edited
  const [editableData, setEditableData] = useState({}); // Track editable data for the transaction

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
        quantity: order.Quantity,
        ProductNO: order.ProductNO
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

  const handleEdit = (transactionID) => {
    setEditMode(transactionID);
    const data = combinedData.find(data => data.transactionID === transactionID);
    setEditableData(data);
  };

  const handleInputChange = (field, value, itemIndex = null) => {
    if (itemIndex !== null) {
      // Update order items
      const updatedOrderItems = [...editableData.orderItems];
      updatedOrderItems[itemIndex][field] = value;
      setEditableData({ ...editableData, orderItems: updatedOrderItems });
    } else {
      // Update other fields
      setEditableData({ ...editableData, [field]: value });
    }
  };

  const handleSave = () => {
    // Save changes to the backend
    const updatedTransaction = {
      transactionID: editableData.transactionID,
      orderNo: editableData.orderNo,
      customerName: editableData.customerName,
      customerAddress: editableData.customerAddress,
      date: editableData.date,
      sum: editableData.sum,
      orderItems: editableData.orderItems.map(item => ({
        ProductNO: item.ProductNO,
        Quantity: item.quantity
      }))
    };

    axios.put(`http://localhost:8080/transaction/${editableData.transactionID}`, updatedTransaction)
      .then(res => {
        setTransactions(transactions.map(t => t.transactionID === editableData.transactionID ? res.data : t));
        setEditMode(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <div className="Content">
        <Sidebar />
        <div className="Content-orderedit">
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
                          <td rowSpan={data.orderItems.length}>
                            {editMode === data.transactionID ? (
                              <input
                                type="text"
                                value={editableData.transactionID}
                                onChange={(e) => handleInputChange('transactionID', e.target.value)}
                              />
                            ) : (
                              data.transactionID
                            )}
                          </td>
                          <td rowSpan={data.orderItems.length}>
                            {editMode === data.transactionID ? (
                              <input
                                type="text"
                                value={editableData.orderNo}
                                onChange={(e) => handleInputChange('orderNo', e.target.value)}
                              />
                            ) : (
                              data.orderNo
                            )}
                          </td>
                          <td rowSpan={data.orderItems.length}>
                            {editMode === data.transactionID ? (
                              <input
                                type="text"
                                value={editableData.customerName}
                                onChange={(e) => handleInputChange('customerName', e.target.value)}
                              />
                            ) : (
                              data.customerName
                            )}
                          </td>
                          <td rowSpan={data.orderItems.length}>
                            {editMode === data.transactionID ? (
                              <input
                                type="text"
                                value={editableData.customerAddress}
                                onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                              />
                            ) : (
                              data.customerAddress
                            )}
                          </td>
                          <td rowSpan={data.orderItems.length}>
                            {editMode === data.transactionID ? (
                              <input
                                type="date"
                                value={editableData.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                              />
                            ) : (
                              data.date
                            )}
                          </td>
                          <td rowSpan={data.orderItems.length}>
                            {editMode === data.transactionID ? (
                              <input
                                type="text"
                                value={editableData.sum}
                                onChange={(e) => handleInputChange('sum', e.target.value)}
                              />
                            ) : (
                              data.sum
                            )}
                          </td>
                        </>
                      )}
                      <td>
                        {editMode === data.transactionID ? (
                          <input
                            type="text"
                            value={item.productFlavor}
                            onChange={(e) => handleInputChange('productFlavor', e.target.value, itemIndex)}
                          />
                        ) : (
                          item.productFlavor
                        )}
                      </td>
                      <td>
                        {editMode === data.transactionID ? (
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => handleInputChange('price', e.target.value, itemIndex)}
                          />
                        ) : (
                          item.price
                        )}
                      </td>
                      <td>
                        {editMode === data.transactionID ? (
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => handleInputChange('quantity', e.target.value, itemIndex)}
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      {itemIndex === 0 && (
                        <td rowSpan={data.orderItems.length}>
                          {editMode === data.transactionID ? (
                            <button className="btn btn-success" onClick={handleSave}>Save</button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEdit(data.transactionID)}
                            >
                              Edit
                            </button>
                          )}
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
