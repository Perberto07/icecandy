import Sidebar from "../Sidebar";
import "./css/Addproduct.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addproduct() {

  const [ProductFlavor, setProductFlavor] = useState('');
  const [Price, setPrice] = useState('');
  const [Email, setEmail] = useState('');
  const [OTP, setOTP] = useState('');
  const [showOTPField, setShowOTPField] = useState(false); // State to control OTP input visibility
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate('');



  const [isProductFlavorValid, setIsProductFlavorValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);

  const [showOTPInput, setShowOTPInput] = useState(false);
 


  function handleSubmit(event) {
    event.preventDefault();

    // Validation: Check if all fields are filled
    if (!ProductFlavor || !Price) {
      alert("All fields are required!");
      // Set validation status for each field
      setIsProductFlavorValid(!!ProductFlavor);
      setIsPriceValid(!!Price);
      return;
    }

    axios.post('http://localhost:8080/sendOTP', { email: Email })
      .then(res => {
        console.log(res);
        setSuccessMessage('OTP sent successfully!');
        setShowOTPField(true); // Show OTP input field after sending OTP
      })
      .catch(err => {
        console.error(err);
        setErrorMessage("Error sending OTP: " + err.response.data);
      });
  }

  function AddProduct() {
    axios.post('http://localhost:8080/addproduct', { ProductFlavor, Price })
      .then(res => {
        console.log(res);
        navigate('/Product/Productlist');
      }).catch(err => console.log(err));
  }


  function handleVerifyOTP() {
    // Verify OTP entered by the user
    axios.post('http://localhost:7000/verifyOTP', { email: Email, otp: OTP })
      .then(res => {
        console.log(res);
        if (res.data === 'OTP verified successfully') {
          setSuccessMessage('OTP verified successfully!');
          AddProduct();
        } else {
          setErrorMessage('Invalid OTP');
        }
      })
      .catch(err => {
        console.error(err);
        setErrorMessage("Error verifying OTP: " + err.response.data);
      });


    // Ask for confirmation before proceeding
    const confirmAdd = window.confirm("Are you sure you want to add this product?");
    if (confirmAdd) {
      // Generate and send OTP
      const generatedOTP = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
      alert(`OTP for confirmation: ${generatedOTP}`);
      const enteredOTP = prompt("Please enter the OTP sent to your email/mobile:");

      // Validate OTP
      if (enteredOTP && enteredOTP === generatedOTP.toString()) {
        // OTP is correct, proceed with adding the product
        axios
          .post("http://localhost:8080/addproduct", { ProductFlavor, Price })
          .then((res) => {
            console.log(res);
            navigate("/Product/Productlist");
          })
          .catch((err) => console.log(err));
      } else {
        alert("Incorrect OTP. Product addition aborted.");
      }
    }
  }

  function handleProductFlavorChange(event) {
    const value = event.target.value;
    // Custom validation: Allow only letters and spaces
    const isValid = /^[a-zA-Z\s]+$/.test(value);
    setProductFlavor(value);
    setIsProductFlavorValid(isValid);
  }

  function handleKeyPress(event) {
    // Prevent input if the key pressed is a number
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }

  }

  return (
    <>
      <Sidebar />
      <div className="Content">
        <div className="AddProduct-container">
          <form onSubmit={handleSubmit}>
            <div className="Product">
              <label htmlFor="flavor">
                New Product<span className={isProductFlavorValid ? "" : "required"}>*</span>:
              </label>
              <input
                type="text"
                id="product"
                placeholder="Enter Product"
                value={ProductFlavor}
                onChange={handleProductFlavorChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <hr />
            <div className="Price">
              <label htmlFor="price">
                Price<span className={isPriceValid ? "" : "required"}>*</span>:
              </label>
              <input
                type="number"
                id="price"
                placeholder="Price"
                value={Price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setIsPriceValid(!!e.target.value);
                }}
              />
            </div>
            <hr />

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={Email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            {showOTPField && (
              <div className="form-group">
                <label>OTP:</label>
                <input
                  type="text"
                  value={OTP}
                  onChange={e => setOTP(e.target.value)}
                  required
                />
              </div>
            )}
            <p className="error-message">{errorMessage}</p>
            <p className="success-message">{successMessage}</p>
            {showOTPField ? (
              <button type="button" onClick={handleVerifyOTP} className="submit-button">Verify OTP</button>
            ) : (
              <button type="submit" className="submit-button">Send OTP</button>
            )}s

            <button type="submit" className="add-button">
              <i className="icon fas fa-plus"></i>
              <span>Add</span>
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Addproduct;
