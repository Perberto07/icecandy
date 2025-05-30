import React, { useState } from "react";
import Sidebar from "../Sidebar";
import "./css/addcustomer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OTPModal from './OTPModal'; // Import the OTPModal component

function Addcustomer() {
  const [Name, setStore] = useState("");
  const [Address, setAddress] = useState("");
  const [ContactPerson, setContact] = useState("");
  const [CellphoneNo, setContactNo] = useState("");
  const [adding, setAdding] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isContactPersonValid, setIsContactPersonValid] = useState(true);
  const [isContactNoValid, setIsContactNoValid] = useState(true);
  const [showOTPModal, setShowOTPModal] = useState(false); // State to control OTP modal
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    // Validation: Check if all fields are filled
    if (!Name || !Address || !ContactPerson || !CellphoneNo) {
      alert("All fields are required!");
      // Set validation status for each field
      setIsNameValid(!!Name);
      setIsAddressValid(!!Address);
      setIsContactPersonValid(!!ContactPerson);
      setIsContactNoValid(!!CellphoneNo);
      return;
    }

    // Prompt before adding
    const confirmAdd = window.confirm("Are you sure you want to add?");
    if (confirmAdd) {
      setShowOTPModal(true); // Show OTP modal when attempting to add
    }
  }

  // Function to handle OTP verification and execute adding of a customer
  const handleOTPVerified = () => {
    setAdding(true);
    axios
      .post("http://localhost:8080/addcustomer", {
        Name,
        Address,
        ContactPerson,
        CellphoneNo,
      })
      .then((res) => {
        console.log(res);
        setAdding(false);
        setShowOTPModal(false); // Close OTP modal after successful addition
        setTimeout(() => {
          alert("Adding complete!");
          navigate("/Customer/Customerlist");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="Content">
        <Sidebar />
        <div className="Content-addcustomer">
          <form onSubmit={handleSubmit}>
            <div className="one">
              <label htmlFor="customerName">
                Store Name
                <span className={isNameValid ? "" : "required"}>*</span>:
              </label>
              <input
                type="text"
                id="customerName"
                placeholder="Enter Customer Name"
                value={Name}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                    setStore(inputValue);
                    setIsNameValid(true);
                  } else {
                    setIsNameValid(false);
                  }
                }}
              />
            </div>
            <hr />
            <div className="two">
              <label htmlFor="address">
                Enter Address
                <span className={isAddressValid ? "" : "required"}>*</span>:
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                value={Address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setIsAddressValid(!!e.target.value);
                }}
              />
            </div>
            <hr />
            <div className="three">
              <label htmlFor="contactPerson">
                Contact Person
                <span className={isContactPersonValid ? "" : "required"}>*</span>:
              </label>
              <input
                type="text"
                id="contactPerson"
                placeholder="Enter Contact Person"
                value={ContactPerson}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                    setContact(inputValue);
                    setIsContactPersonValid(true);
                  } else {
                    setIsContactPersonValid(false);
                  }
                }}
              />
            </div>
            <div className="four">
              <label htmlFor="contactNumber">
                Contact Number
                <span className={isContactNoValid ? "" : "required"}>*</span>:
              </label>
              <input
                type="number"
                id="contactNumber"
                placeholder="Enter Contact Number"
                value={CellphoneNo}
                onChange={(e) => {
                  setContactNo(e.target.value);
                  setIsContactNoValid(!!e.target.value);
                }}
              />
            </div>
            <button type="submit" className="addcustomer-button" disabled={adding}>
              {adding ? "✅" : "+"}
            </button>
          </form>
        </div>
      </div>
      {/* OTP modal component */}
      {showOTPModal && (
        <OTPModal
          onVerify={handleOTPVerified} // Pass the function to handle OTP verification
        />
      )}
    </>
  );
}

export default Addcustomer;
