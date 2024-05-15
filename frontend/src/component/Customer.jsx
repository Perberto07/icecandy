import React from 'react';
import { Link } from 'react-router-dom';
import './css/customer.css'; // Make sure to import your CSS file
import './css/content.css';
import Sidebar from '../Sidebar';

const CustomerComponent = () => {
  return (
    <>
      <Sidebar />
      <div className='Content'>
        <div className="container">
          <div className='customer'>
            <div className="link-container">
              <Link to="/Customer/Customerlist" className="button">
                <i className="icon fas fa-info-circle"></i>Customer
              </Link>
            </div>
            <div className="link-container">
              <Link to="/Customer/Addcustomer" className="button">
                <i className="icon fas fa-plus"></i>Add Customer
              </Link>
            </div>
            <div className="link-container">
              <Link to="/Customer/Editcustomer" className="button">
                <i className="icon fas fa-handshake"></i>Edit Customer
              </Link>
            </div>
            <div className="link-container">
              <Link to="/Customer/Deletecustomer" className="button">
                <i className="icon fas fa-handshake"></i>Delete Customer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerComponent;
