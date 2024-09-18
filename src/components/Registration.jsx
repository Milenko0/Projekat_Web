import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationService from '../services//RegistrationService';
import { GoogleLogin } from 'react-google-login';
import '../style/RegistrationStyle.css';

const Registration = () => {
    const redirection = useNavigate();
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [userType, setUserType] = useState("");
    const [image, setImage] = useState("");

    const user = {
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
        state: "Waiting"
    };

    // Function for validating fields and sending data to the server for registration
    const userRegistration = async () => {
        var dob = new Date(dateOfBirth);
        var currentYear = new Date().getFullYear();
        var dobYear = dob.getFullYear();
        if (userName.length === 0) {
            alert("Korisničko ime je obavezno!");
        }
        else if (!/[a-zA-Z0-9]/.test(userName)) {
            alert("Korisničko ime mora sadržavati slova ili brojeve!");
        }
        else if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email) || !email.includes('@') || !email.includes('.')) {
            alert("Email mora biti popunjen!");
        }
        else if (password.length === 0 || password.length < 6) {
            alert("Lozinka mora imati barem 6 karaktera!");
        }
        else if (passwordCheck.length === 0 || password.length < 6) {
            alert("Polje za proveru lozinke mora biti popunjeno!");
        }
        else if (passwordCheck !== password) {
            alert("Lozinke se ne poklapaju!");
        }
        else if (firstName.length === 0) {
            alert("Ime je obavezno!");
        }
        else if (!/^[a-zA-Z\u00C0-\u017F]*$/.test(firstName)) {
            alert("Ime može sadržavati samo slova!");
        }
        else if (lastName.length === 0) {
            alert("Prezime je obavezno!");
        }
        else if (!/^[a-zA-Z\u00C0-\u017F]*$/.test(lastName)) {
            alert("Prezime može sadržavati samo slova!");
        }
        else if (dateOfBirth.length === 0) {
            alert("Datum rođenja je obavezan!");
        }
        else if (dobYear >= currentYear) {
            alert("Datum rođenja nije validan!");
        }
        else if (address.length === 0) {
            alert("Adresa je obavezna!");
        }
        else if (!/^[a-zA-Z0-9\s\u00C0-\u017F]+$/.test(address)) {
            alert("Adresa može sadržavati samo slova i brojeve!");
        }
        else {
            try {
                const response = await RegistrationService.registerUser(user);
                if (response.message === '1') {
                   // alert('Uspešno ste se registrovali!');
                    redirection('/login');
                }
                else if (response.message === '-1') {
                    alert('Korisnik sa korisničkim imenom već postoji!');
                }
                else if (response.message === '-2') {
                    alert('Korisnik sa emailom već postoji!');
                }
                else {
                    alert('Registracija neuspešna!');
                }
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    };

    // Function for dynamically displaying selected image
    function previewImageReg(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    const previewImg = document.getElementById('profileImage');
                    if (previewImg) {
                        previewImg.src = e.target.result;
                        previewImg.style.width = '120px';
                        previewImg.style.height = 'auto';
                    }
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Function for handling successful Google login
    const onSuccess = async (response) => {
        if (response.profileObj) {
            const { name, email, familyName, givenName } = response.profileObj;
            try {
                const response = await RegistrationService.googleAccountLogin(name, email, familyName, givenName);
                if (response.message === '2') {
                  //  alert('Uspešno ste se registrovali!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard');
                }
                else if (response.message === '1') {
                    //alert('Uspešno ste se prijavili!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard');
                }
                else {
                    alert('Registracija neuspešna!');
                }
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        } else {
            console.error('Došlo je do greške!');
        }
    };

    // Function for handling Google login failure
    const onFailure = (error) => {
        alert("Došlo je do greške!");
        console.error('Došlo je do greške pri prijavi na Google nalog:', error);
    };

    return (
      <div className="registration-form">
        <h2>Registration</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <input 
                  type="text" 
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
                  type="password" 
                  name="password"
                  placeholder='Password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </td>
            </tr>
            <tr>
              <td>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder='Confirm Password'
                  value={passwordCheck} 
                  onChange={(e) => setPasswordCheck(e.target.value)} 
                  required 
                />
              </td>
            </tr>
            <tr>
              <td>
                <input 
                  type="text" 
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
                  name="userType" 
                  value={userType} 
                  onChange={(e) => setUserType(e.target.value)} 
                  required
                >
                  <option value="" disabled hidden>User Type</option>
                  <option value="user">User</option>
                  <option value="driver">Driver</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input 
                  type="file" 
                  name="profilePicture" 
                  onChange={(e) => {setImage(e.target.value); previewImageReg(e.target); }}
                  required 
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="button" onClick={userRegistration}>Registration</button>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
        <p>Already Registered? 
          <a href="/">Login</a>
        </p>
      </div>
    );    
};

export default Registration;
