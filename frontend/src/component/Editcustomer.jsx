import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import OTPModal from './OTPModal';
import './css/editcustomer.css';
import './css/topback.css';

function Editcustomer() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editingCustomerData, setEditingCustomerData] = useState({
    Name: '',
    Address: '',
    ContactPerson: '',
    CellphoneNO: '',
    Email: '' // Ensure Email field is included
  });
  const [searchInput, setSearchInput] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8080/customer')
      .then(res => {
        setCustomers(res.data);
        setFilteredCustomers(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleEditClick = (customer) => {
    
    setEditingCustomerId(customer.CustomerNO);
    setEditingCustomerData({
      Name: customer.Name,
      Address: customer.Address,
      ContactPerson: customer.ContactPerson,
      CellphoneNO: customer.CellphoneNO,
      Email: customer.Email // Ensure email is included
    });
  };

  const handleOTPVerified = () => {
    const confirmUpdate = window.confirm("Are you sure you want to apply changes?");
    if (confirmUpdate) {
      handleUpdateClick(editingCustomerId);
    }
    setShowOTPModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomerData({ ...editingCustomerData, [name]: value });
  };

  const handleUpdateClick = (customerId) => {
    setShowOTPModal(true);
    axios.put(`http://localhost:8080/customer/${customerId}`, editingCustomerData)
      .then(() => {
        setCustomers(customers.map(customer =>
          customer.CustomerNO === customerId ? { ...customer, ...editingCustomerData } : customer
        ));
        setFilteredCustomers(filteredCustomers.map(customer =>
          customer.CustomerNO === customerId ? { ...customer, ...editingCustomerData } : customer
        ));
        setEditingCustomerId(null);
      })
      .catch(err => console.error(err));
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
        <div className='edit-customer-container'>
          <h2 className='edit-customer-heading'>Edit Customer</h2>
          <div className='edit-table'>
            <div className='w-200 h-90 bg-white rounded p-4'>
              <input
                type="text"
                placeholder="Search by Store Name"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <table className='edit-customer-table'>
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
                  {filteredCustomers.map((customer, index) => (
                    <tr key={index}>
                      {editingCustomerId === customer.CustomerNO ? (
                        <>
                          <td>{customer.CustomerNO}</td>
                          <td>
                            <input
                              type="text"
                              name="Name"
                              value={editingCustomerData.Name}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                                  handleInputChange(e);
                                }
                              }}
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
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                                  handleInputChange(e);
                                }
                              }}
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
                            <button className="customer-list-button" onClick={() => setShowOTPModal(true)}><i className="fa fa-save"></i>Update</button>
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
                            <button className="customer-list-button" onClick={() => handleEditClick(customer)}><i className="fa fa-edit"></i> Edit</button>
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
      {showOTPModal && (
        <OTPModal
          email={editingCustomerData.Email} // Pass the email to the OTP modal
          onVerify={handleOTPVerified} // Pass the function to handle OTP verification success
        />
      )}
    </>
  );
}

export default Editcustomer;
