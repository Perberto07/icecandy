import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import './css/editcustomer.css'; // Import the editcustomer.css file
import './css/topback.css';

function Editcustomer() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editingCustomerData, setEditingCustomerData] = useState({
        Name: '',
        Address: '',
        ContactPerson: '',
        CellphoneNO: ''
    });
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/customer')
            .then(res => setCustomers(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleEditClick = (customer) => {
        setEditingCustomerId(customer.CustomerNO);
        setEditingCustomerData({
            Name: customer.Name,
            Address: customer.Address,
            ContactPerson: customer.ContactPerson,
            CellphoneNO: customer.CellphoneNO
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingCustomerData({ ...editingCustomerData, [name]: value });
    };

    const handleUpdateClick = (customerId) => {
        axios.put(`http://localhost:8080/customer/${customerId}`, editingCustomerData)
            .then(() => {
                setCustomers(customers.map(customer =>
                    customer.CustomerNO === customerId ? { ...customer, ...editingCustomerData } : customer
                ));
                setEditingCustomerId(null);
            })
            .catch(err => console.error(err));
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
            <div className='Content' ref={contentRef}>
                <div className='edit-customer-container'> {/* Update the container class */}
                    <h2 className='edit-customer-heading'>Edit Customer</h2> {/* Apply the heading class */}
                    <div className='col-md-9 bg-dark bg-opacity-100 d-flex justify-content-center align-items-center'>
                        <div className='w-200 h-90 bg-white rounded p-4'>
                            <table className='edit-customer-table'> {/* Apply the table class */}
                                <thead>
                                    <tr>
                                        <th>Customer NO.</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Contact Person</th>
                                        <th>Cellphone Number</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer, index) => (
                                        <tr key={index}>
                                            {editingCustomerId === customer.CustomerNO ? (
                                                <>
                                                    <td>{customer.CustomerNO}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="Name"
                                                            value={editingCustomerData.Name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="Address"
                                                            value={editingCustomerData.Address}
                                                            onChange={handleInputChange}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="ContactPerson"
                                                            value={editingCustomerData.ContactPerson}
                                                            onChange={handleInputChange}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="CellphoneNO"
                                                            value={editingCustomerData.CellphoneNO}
                                                            onChange={handleInputChange}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button className="customer-list-button" onClick={() => handleUpdateClick(customer.CustomerNO)}>Update</button> {/* Apply the button class */}
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{customer.CustomerNO}</td>
                                                    <td>{customer.Name}</td>
                                                    <td>{customer.Address}</td>
                                                    <td>{customer.ContactPerson}</td>
                                                    <td>{customer.CellphoneNO}</td>
                                                    <td>
                                                        <button className="customer-list-button" onClick={() => handleEditClick(customer)}>Edit</button> {/* Apply the button class */}
                                                    </td>
                                                </>
                                            )}
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
            </div>
        </>
    );
}

export default Editcustomer;
