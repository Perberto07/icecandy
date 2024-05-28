import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Modal from './Modal';  // Import the Modal component
import './css/topback.css'
import { useRef } from 'react';

function Deletecustomer() {
    const [Customer, setCustomer] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/customer')
            .then(res => setCustomer(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDeleteClick = (customerId) => {
        setSelectedCustomerId(customerId);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://localhost:8080/customer/${selectedCustomerId}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    setCustomer(Customer.filter(customer => customer.CustomerNO !== selectedCustomerId));
                } else {
                    console.error("Error deleting customer:", res.data.Message);
                }
            })
            .catch(err => console.error(err))
            .finally(() => {
                setShowModal(false);
                setSelectedCustomerId(null);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCustomerId(null);
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
            <Sidebar />

            <div className='Content' ref={contentRef} style={{ height: '100vh', overflowY: 'auto' }}>
                <div className='col-md-9 bg-dark bg-opacity-100 d-flex justify-content-center align-items-center'>
                    <div className='w-200 h-90 bg-white rounded p-4'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Customer NO.</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Contact Person</th>
                                    <th>CellPhone Number</th>
                                    <th>Delete</th>
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
                                        <td>
                                            <button onClick={() => handleDeleteClick(Customer.CustomerNO)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
            <button onClick={scrollToTop} className='back-to-top'>
                            Back to Top
                        </button>

            <Modal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this customer?"
            />
        </>
    );
}

export default Deletecustomer;
