import  { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';

import OTPModal from './OTPModal'; // Import the OTPModal component
import './css/topback.css';
import './css/deletecustomer.css';

function Deletecustomer() {
    const [customers, setCustomers] = useState([]);
   
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [showOTPModal, setShowOTPModal] = useState(false); // State to control OTP modal
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/customer')
            .then(res => {
                setCustomers(res.data);
                setFilteredCustomers(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleDeleteClick = (customerId) => {
        setSelectedCustomerId(customerId);
        setShowOTPModal(true); // Show OTP modal when attempting to delete
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://localhost:8080/customer/${selectedCustomerId}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    setCustomers(customers.filter(customer => customer.CustomerNO !== selectedCustomerId));
                    setFilteredCustomers(filteredCustomers.filter(customer => customer.CustomerNO !== selectedCustomerId));
                } else {
                    console.error("Error deleting customer:", res.data.Message);
                }
            })
            .catch(err => console.error(err))
            .finally(() => {
                setShowOTPModal(false); // Close OTP modal after deletion
                setSelectedCustomerId(null);
            });
    };

   

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
        const filtered = customers.filter(customer =>
            customer.Name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredCustomers(filtered);
    };

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
                <div className='delete-content' >
                    <div className='delete-customer-container'>
                        <h2 className='delete-customer-heading'>Delete Customer</h2>
                        <input
                            type="text"
                            placeholder="Search by Store Name"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        />
                        <table className='delete-customer-table'>
                            <thead>
                                <tr>
                                    <th>Customer NO.</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Contact Person</th>
                                    <th>CellPhone Number</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer, index) => (
                                    <tr key={index}>
                                        <td>{customer.CustomerNO}</td>
                                        <td>{customer.Name}</td>
                                        <td>{customer.Address}</td>
                                        <td>{customer.ContactPerson}</td>
                                        <td>{customer.CellphoneNO}</td>
                                        <td>
                                            <button className="delete-button" onClick={() => handleDeleteClick(customer.CustomerNO)}>
                                                <i className="icon fas fa-trash"></i>
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button onClick={scrollToTop} className='back-to-top'>
                        Back to Top
                    </button>
                </div>
            </div>
            {/* OTP modal component */}
            {showOTPModal && (
                <OTPModal
                    onVerify={handleConfirmDelete} // Pass the function to handle OTP verification
                />
            )}
        </>
    );
}

export default Deletecustomer;
