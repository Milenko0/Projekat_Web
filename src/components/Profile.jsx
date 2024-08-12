import React, { useState } from 'react';
import '../style/ProfileStyle.css'; // Napravi odgovarajući CSS fajl za stilizaciju
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  /*const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    dateOfBirth: user.dateOfBirth || '',
    address: user.address || '',
    userType: user.userType || '',
    profilePicture: null,
  });*/
  

  const defaultFormData = {
    username: user?.username || 'N/A',
    email: user?.email || 'N/A',
    firstName: user?.firstName || 'N/A',
    lastName: user?.lastName || 'N/A',
    dateOfBirth: user?.dateOfBirth || 'N/A',
    address: user?.address || 'N/A',
    userType: user?.userType || 'User',
    profilePicture: null,
  };
  
  const [formData, setFormData] = useState(defaultFormData);
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
      profilePicture: selectedFile || null,
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('username', formData.username);
      form.append('email', formData.email);
      form.append('firstName', formData.firstName);
      form.append('lastName', formData.lastName);
      form.append('dateOfBirth', formData.dateOfBirth);
      form.append('address', formData.address);
      form.append('userType', formData.userType);
      if (formData.profilePicture) {
        form.append('profilePicture', formData.profilePicture);
      }

      // Pretpostavljam da imaš API endpoint za izmenu profila
      const apiEndpoint = process.env.REACT_APP_PROFILE_API_URL;
      await axios.put(`${apiEndpoint}/${user.id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Profile updated successfully!");
      navigate("/dashboard"); // Redirekcija na dashboard nakon uspešnog ažuriranja
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile. Please try again.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-form">
      <h2>{isEditing ? 'Edit Profile' : 'Profile Details'}</h2>

      {!isEditing ? (
        <div>
          <p><strong>Username:</strong> {formData.username}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>User Type:</strong> {formData.userType}</p>
          {formData.profilePicture && (
            <div>
              <img 
                src={URL.createObjectURL(formData.profilePicture)} 
                alt="Profile" 
                width="100" 
                height="100"
              />
            </div>
          )}
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSaveClick} method='post'>
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
              disabled // Ako želiš da korisnik ne može promeniti svoju ulogu
            >
              <option value="User">User</option>
              <option value="Admin">Administrator</option>
              <option value="Driver">Driver</option>
            </select>
          </div>
          <div>
            <input 
              type="file" 
              name="profilePicture" 
              onChange={handleImageUrlChange} 
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
      )}
    </div>
  );
}