import  { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Sidebar from "../Sidebar";
import './css/customerlist.css';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8000/orders/')  // Replace with your actual API URL
        .then(res => setOrders(res.data))
        .catch(err => console.error(err))
  }, []);

  const scrollToTop = () => {
    if (contentRef.current) {
        contentRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};


  return (
    <div className="Content p-4" ref={contentRef}>
  <Sidebar />
  
  {/* Scrollable container */}
    <div className="customer-list-container"> {/* Apply the container class */}
    <h1 className="customer-list-heading">Orderlist</h1>
    <table className="customer-list-table">
      <thead >
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Status</th>
          <th>Items</th>
          <th>Total ($)</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.OrderId} >
            <td>{order.OrderId}</td>
            <td>{order.customername}</td>
            <td>
              {new Date(order.created_at).toLocaleString()}
            </td>
            <td>{order.status}</td>
            <td>
              <ul className="list-disc ml-4">
                {order.item.map((item, idx) => (
                  <li key={idx}>
                    {item.quantity}× {item.product} = ${item.item_subtotal}
                  </li>
                ))}
              </ul>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-right">{order.total_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <button onClick={scrollToTop} className='back-to-top'> {/* Apply the back-to-top class */}
                    Back to Top
</button>
</div>

  );
}

export default OrdersList;
