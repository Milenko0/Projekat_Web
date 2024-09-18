import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfileService from '../services/EditProfileService';
//import axios from "axios";
import '../style/ProfileStyle.css';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const redirection = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [userType, setUserType] = useState("");
    const [state, setState] = useState("None");
    const [image, setImage] = useState(null); // Changed to null to represent absence of file
    const [imagePreview, setImagePreview] = useState(""); // To store image URL preview

     // Funkcija za zaštitu stranice
     useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          redirection('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    // Fetching user data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProfileService.getProfileData();
                let typeOfUser = response.userType === 'user' ? 'Korisnik' : response.userType === 'driver' ? 'Vozač' : response.userType;
                
                setUserName(response.userName);
                setEmail(response.email);
                setPassword(response.password);
                setPasswordCheck(response.password);
                setFirstName(response.firstName);
                setLastName(response.lastName);
                setDateOfBirth(response.dateOfBirth);
                setAddress(response.address);
                setUserType(typeOfUser);
                setState(response.state);
                
                if (response.image) {
                    setImagePreview(response.image); // Set image preview if available
                }
            } catch (error) {
                console.error('Error occurred: ', error);
            }
        };
        fetchData();
    }, []);

   // Validating fields and submitting profile data
const modifyProfile = async () => {
    const year = new Date(dateOfBirth);
    const currentYear = new Date().getFullYear();
    const fullYear = year.getFullYear();

    if (userName.length === 0) {
        alert("Username is required!");
    } else if (!/[a-zA-Z0-9]/.test(userName)) {
        alert("Username must contain letters or numbers!");
    } else if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email) || !email.includes('@') || !email.includes('.')) {
        alert("Valid email is required!");
    } else if (password.length === 0 || password.length < 6) {
        alert("Password is required and must be at least 6 characters!");
    } else if (passwordCheck.length === 0 || password.length < 6) {
        alert("Password confirmation is required!");
    } else if (passwordCheck !== password) {
        alert("Password and confirmation do not match!");
    } else if (firstName.length === 0) {
        alert("First name is required!");
    } else if (!/^[a-zA-Z\u00C0-\u017F]*$/.test(firstName)) {
        alert("First name must contain only letters!");
    } else if (lastName.length === 0) {
        alert("Last name is required!");
    } else if (!/^[a-zA-Z\u00C0-\u017F]*$/.test(lastName)) {
        alert("Last name must contain only letters!");
    } else if (dateOfBirth.length === 0) {
        alert("Date of birth is required!");
    } else if (fullYear >= currentYear) {
        alert("Invalid date of birth!");
    } else if (address.length === 0) {
        alert("Address is required!");
    } else if (!/^[a-zA-Z0-9\s\u00C0-\u017F]+$/.test(address)) {
        alert("Address must contain only letters and numbers!");
    } else {
        try {
            const response = await ProfileService.editProfile({
                userName,
                email,
                password,
                passwordCheck,
                firstName,
                lastName,
                dateOfBirth,
                address,
                userType,
                image,
                state
            });
            if (response.message === '1') {
                //alert('Profile updated successfully!');
                setIsEditing(false);
            } else {
                alert('Error processing data!');
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
}

    // Dynamically displaying selected image
    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              console.log("Image URL:", reader.result);
                setImagePreview(reader.result);
                setImage(file); // Store the File object in state
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };
  
    const handleCancelClick = () => {
        setIsEditing(false);
    };
/*
    const handleSaveClick = async () => {
        try {
            const form = new FormData();
            form.append('username', userName);
            form.append('email', email);
            form.append('firstName', firstName);
            form.append('lastName', lastName);
            form.append('dateOfBirth', dateOfBirth);
            form.append('address', address);
            form.append('userType', userType);
            if (image) {
                form.append('profilePicture', image);
            }

            const apiEndpoint = process.env.REACT_APP_PROFILE_API_URL;
            await axios.put(`${apiEndpoint}/${userName}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert("Profile updated successfully!");
            redirection("/dashboard"); // Redirect to dashboard after successful update
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating the profile. Please try again.");
        }
    };*/

    return (
      <div className="profile-form">
        {userType === "admin" && (
          <div className="header">
            <header>
              <Link to="/profile">Profile</Link>
              <Link to="/verification">Verification</Link>
              <Link to="/all-trips">All Trips</Link>
              <Link to="/ratings">Ratings</Link>
              <Link to="/logout">Log out</Link>
            </header>
          </div>
        )}
        {userType === "Vozač" && (
          <div className="header">
            <header>
              <Link to="/profile">Profile</Link>
              <Link to="/new-trips">New Trips</Link>
              <Link to="/my-trips">My Trips</Link>
              <Link to="/logout">Log out</Link>
            </header>
          </div>
        )}
        {userType === "Korisnik" && (
          <div className="header">
            <header>
              <Link to="/profile">Profile</Link>
              <Link to="/new-trip">New Trip</Link>
              <Link to="/previous-trips">Previous Trips</Link>
              <Link to="/logout">Log out</Link>
            </header>
          </div>
        )}
        <h2>{isEditing ? 'Edit Profile' : 'Profile Details'}</h2>
    
        {!isEditing ? (
          <div>
            <table>
              <tbody>
                <tr>
                  <td><strong>Username:</strong></td>
                  <td>{userName}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td><strong>First Name:</strong></td>
                  <td>{firstName}</td>
                </tr>
                <tr>
                  <td><strong>Last Name:</strong></td>
                  <td>{lastName}</td>
                </tr>
                <tr>
                  <td><strong>Date of Birth:</strong></td>
                  <td>{dateOfBirth}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{address}</td>
                </tr>
                <tr>
                  <td><strong>User Type:</strong></td>
                  <td>{userType}</td>
                </tr>
                {imagePreview && (
                  <tr>
                    <td><strong>Profile picture:</strong></td>
                    <td>
                      <img 
                        src={imagePreview} 
                        alt="Profile" 
                        width="100" 
                        height="100"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="edit-profile" onClick={handleEditClick}>Edit Profile</button>
          </div>
        ) : (
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input 
                      type="text" 
                      id="userName" 
                      name="userName" 
                      placeholder='Username'
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)} 
                      required 
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder='Email'
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      placeholder='First Name'
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      required 
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      placeholder='Last Name'
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      required 
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input 
                      type="date" 
                      id="dateOfBirth" 
                      name="dateOfBirth" 
                      placeholder='Date of Birth'
                      value={dateOfBirth} 
                      onChange={(e) => setDateOfBirth(e.target.value)} 
                      required 
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      placeholder='Address'
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      required 
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <select 
                      id="userType" 
                      name="userType" 
                      value={userType}  
                      disabled // If you want to disable user type changes
                    >
                      <option value="user">User</option>
                      <option value="admin">admin</option>
                      <option value="driver">Driver</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input 
                      type="file" 
                      id="imageInput" 
                      name="imageInput"
                      onChange={previewImage}
                    />
                    {imagePreview && (
                                        <div>
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                width="100" 
                                                height="100"
                                            />
                                        </div>
                                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="save-changes" type="button"  onClick={modifyProfile}>Save Changes</button>
            <button className="cancel" type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        )}
      </div>
    );
};

export default Profile;
