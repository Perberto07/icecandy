import React, { useState } from 'react';
import axios from 'axios';

const OTPModal = ({ email, onVerify }) => {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [newEmail, setEmail] = useState(email); // Initialize newEmail state with the provided email prop

  const handleSendOTP = () => {
    axios.post('http://localhost:8080/sendOTP', { email: newEmail }) // Use newEmail instead of email
      .then(res => {
        console.log(res);
        setMessage('OTP sent successfully!');
      })
      .catch(err => {
        console.error(err);
        setMessage("Error sending OTP: " + err.response.data);
      });
  };

  const handleVerifyOTP = () => {
    axios.post('http://localhost:8080/verifyOTP', { email: newEmail, otp }) // Use newEmail instead of email
      .then(res => {
        console.log(res);
        if (res.data === 'OTP verified successfully') {
          onVerify();
          setMessage('OTP verified successfully');
        } else {
          setMessage('Invalid OTP');
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Error verifying OTP: " + err.response.data);
      });
  };

  const handleEmailChange = (e) => {
    const newEmailValue = e.target.value;
    // Update the newEmail state
    setEmail(newEmailValue);
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="otpModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="otpModalLabel">OTP Verification</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setMessage('')}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {message && <p>{message}</p>}
            {!message && (
              <>
                <div className="form-group">
                  <label htmlFor="email">Email address:</label>
                  {/* Use newEmail instead of email */}
                  <input type="email" className="form-control" id="email" value={newEmail} onChange={handleEmailChange} />
                </div>
                <button className="btn btn-primary" onClick={handleSendOTP}>Send OTP</button>
              </>
            )}
            {newEmail && (
              <>
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP:</label>
                  <input type="text" className="form-control" id="otp" value={otp} onChange={e => setOTP(e.target.value)} />
                </div>
                <button className="btn btn-primary" onClick={handleVerifyOTP}>Verify OTP</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
