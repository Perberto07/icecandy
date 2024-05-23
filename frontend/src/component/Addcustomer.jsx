import Sidebar from "../Sidebar";
import './css/addcustomer.css';

function Addcustomer() {
  return (
    <>
      <Sidebar />
      <div className="Content">
        <div className="Content2">
          <div className="one">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              placeholder="Enter Customer Name"
            />
          </div>

          <hr />

          <div className="two">
            <label htmlFor="address">Enter Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
            />
          </div>

          <hr />

          <div className="three">
            <label htmlFor="storeName">Store Name:</label>
            <input
              type="text"
              id="storeName"
              placeholder="Enter Store Name"
            />
          </div>
          <button>
            send
          </button>
        </div>
      </div>
    </>
  );
}

export default Addcustomer;