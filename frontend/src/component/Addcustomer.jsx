import React, { useState } from "react";
import Sidebar from "../Sidebar";
import "./css/addcustomer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          setTimeout(() => {
            alert("Adding complete!");
            navigate("/Customer/Customerlist");
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  }

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
                  setStore(e.target.value);
                  setIsNameValid(!!e.target.value);
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
                  setContact(e.target.value);
                  setIsContactPersonValid(!!e.target.value);
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
    </>
  );
}

export default Addcustomer;
