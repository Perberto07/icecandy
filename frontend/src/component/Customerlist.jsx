import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import './css/topback.css'

function Customerlist() {
    const [Customer, setCustomer] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/customer')
            .then(res => setCustomer(res.data))
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
            <Sidebar/>
            <div className='Content' ref={contentRef} style={{ height: '100vh', overflowY: 'auto' }}>
                <div className='col-md-9 bg-dark bg-opacity-100 d-flex justify-content-center align-items-center'>
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
                                {Customer.map((Customer, index) => (
                                    <tr key={index}>
                                        <td>{Customer.CustomerNO}</td>
                                        <td>{Customer.Name}</td>
                                        <td>{Customer.Address}</td>
                                        <td>{Customer.ContactPerson}</td>
                                        <td>{Customer.CellphoneNO}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button onClick={scrollToTop} className='back-to-top'>
                            Back to Top
                </button>
            </div>
        </>
    );
}

export default Customerlist;
