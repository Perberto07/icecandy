import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import './css/topback.css';
import './css/customerlist.css'; // Import the customer list CSS file

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/customer')
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
            <Sidebar />
            <div className='Content' ref={contentRef}>
                <div className='w-200 h-90 bg-white rounded p-4'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Customer NO.</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Contact person</th>
                                <th>CellPhone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={index}>
                                    <td>{customer.CustomerNO}</td>
                                    <td>{customer.Name}</td>
                                    <td>{customer.Address}</td>
                                    <td>{customer.ContactPerson}</td>
                                    <td>{customer.CellphoneNO}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={scrollToTop} className='back-to-top'>
                    Back to Top
                </button>
            </div>
        </>
    );
}

export default Customerlist;
