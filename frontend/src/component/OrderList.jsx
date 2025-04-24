import  { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Sidebar from "../Sidebar";

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
  <div className="overflow-auto max-h-[80vh] border rounded shadow">
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th className="border border-gray-300 px-4 py-2">Order ID</th>
          <th className="border border-gray-300 px-4 py-2">Customer</th>
          <th className="border border-gray-300 px-4 py-2">Date</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Items</th>
          <th className="border border-gray-300 px-4 py-2">Total ($)</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.OrderId} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{order.OrderId}</td>
            <td className="border border-gray-300 px-4 py-2">{order.customername}</td>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(order.created_at).toLocaleString()}
            </td>
            <td className="border border-gray-300 px-4 py-2">{order.status}</td>
            <td className="border border-gray-300 px-4 py-2">
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
</div>

  );
}

export default OrdersList;
