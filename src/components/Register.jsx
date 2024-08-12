import React, { useEffect, useState } from 'react';
import '../style/RegisterStyle.css';
import { GoogleLogin } from '@react-oauth/google';
//import { gapi } from 'gapi-script';
import { RegularRegisterApiCall } from '../services/RegisterService.js';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const regularRegisterApiEndpoint = process.env.REACT_APP_REGULAR_REGISTER_API_URL;
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    userType: '',
    profilePicture: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleImageUrlChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({
        ...formData,
        imageUrl: selectedFile || null,
    });
};

const handleRegisterClick = async (e) => {
    e.preventDefault();
    
    const resultOfRegister = await RegularRegisterApiCall(formData, regularRegisterApiEndpoint);
    if (resultOfRegister) {
        alert("Successfully registered!");
        navigate("/");
    }
};

/*useEffect(() => {
    if (clientId) {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        }
        gapi.load('client:auth2', start);
    } else {
        console.error("Client ID is not defined in .env file");
    }
}, [clientId]);*/

const onSuccess = (res) => {
    const profile = res.profileObj;
    setFormData({
        ...formData,
        email: profile.email,
        firstName: profile.givenName,
        lastName: profile.familyName,
    });
    alert("Please complete other fields!");
}

const onFailure = (res) => {
    console.log("Failed to register:", res);
}

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleRegisterClick} method='post'>
        <div>
          <input 
            type="text" 
            name="username" 
            placeholder='Username'
            value={formData.username} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="email" 
            name="email" 
            placeholder='Email'
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="password" 
            name="password"
            placeholder='Password' 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder='Confirm Password'
            value={formData.confirmPassword} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="firstName" 
            placeholder='First Name'
            value={formData.firstName} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="lastName" 
            placeholder='Last Name'
            value={formData.lastName} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="date" 
            name="dateOfBirth" 
            placeholder='Date of Birth'
            value={formData.dateOfBirth} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="text" 
            name="address" 
            placeholder='Address'
            value={formData.address} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <select 
            name="userType" 
            value={formData.userType} 
            onChange={handleInputChange} 
            required
          >
            <option value="" disabled selected hidden>User Type</option>
            <option value="User">User</option>
            <option value="Admin">Administrator</option>
            <option value="Driver">Driver</option>
          </select>
        </div>
        <div>
          <input 
            type="file" 
            placeholder='Profile Picture'
            name="profilePicture" 
            onChange={handleImageUrlChange} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <hr />
      <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
    />
    <p>Already registered? 
    <a href="/">Login</a>
    </p>
    </div>
  );
}