import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import './css/topback.css';
import './css/customerlist.css'; // Import the customer list CSS file

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/candy/')
            .then(res => setCustomers(res.data))
            .catch(err => console.error(err));
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
        <>
            <div className='Content' ref={contentRef}>
                <Sidebar />
                <div className='customer-list-container'> {/* Apply the container class */}
                    <h2 className='customer-list-heading'>Customer List</h2> {/* Apply the heading class */}
                    <table className='customer-list-table'> {/* Apply the table class */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>CellPhone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={index}>
                                    <td>{customer.customername}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={scrollToTop} className='back-to-top'> {/* Apply the back-to-top class */}
                    Back to Top
                </button>
            </div>
        </>
    );
}

export default Customerlist;
