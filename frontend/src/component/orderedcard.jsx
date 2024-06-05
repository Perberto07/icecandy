import { useEffect, useState, } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';



function Customerlist() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/orders')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, []);


    return (
        <>
            <Sidebar />
            <div className='order-card'>
                <div className='customer-list-container'> {/* Apply the container class */}
                    <h2 className='customer-list-heading'>Orders</h2> {/* Apply the heading class */}
                    <table className='customer-list-table'> {/* Apply the table class */}
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.orderNo}</td>
                                    <td>{order.Name}</td>
                                    <td>{order.Address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Customerlist;