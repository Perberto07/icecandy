import { Link } from 'react-router-dom';
import './css/customer.css'; // Make sure to import your CSS file
import './css/content.css'
import Sidebar from '../Sidebar';

const CustomerComponent = () => {
  return (
    <>
    <Sidebar/>
    <div className='Content'>
    <div className="container">
      <div className='customer'>
      <ul><li><h2>
        <Link to="/Customerlist" className="button">
          <i className="icon fas fa-info-circle"></i>Customer
        </Link>
      </h2></li>
     
      
        <li>
          <Link to="/Customer/Addcustomer" className="button">
            <i className="icon fas fa-plus"></i>Add Customer
          </Link>
        </li>
        <li>
          <Link to="/Customer/Editcustomer" className="button">
            <i className="icon fas fa-handshake"></i>Edit Customer
          </Link>
        </li>
        <li>
          <Link to="/Customer/Deletecustomer" className="button">
            <i className="icon fas fa-handshake"></i>Delete Customer
          </Link>
        </li>
      </ul>
      </div>
    </div>
    </div>
    </>
  );
};

export default CustomerComponent;
