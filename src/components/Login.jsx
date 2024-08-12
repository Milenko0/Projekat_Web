import React from 'react';
import '../style/LoginStyle.css';
import { useState } from 'react';
import { AuthenticateUser } from '../services/LoginService';
import {useNavigate} from "react-router-dom";

export default function Login() {
  const [userEmail, setEmail] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [userPassword, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(true);
  const loginApiUrl = process.env.REACT_APP_LOGIN;
  const navigate = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();
  
    if (emailError) {
        return alert("Unesite validan email!");
      }
      if (passwordError) {
        return alert("Lozinka treba da ima 8 znakova, jedno veliko slovo, jedan broj i jedan specijalni znak");
      }
  
      try {
        const responseOfLogin = await AuthenticateUser(userEmail, userPassword, loginApiUrl);
        console.log("Response from login user", responseOfLogin);
  
        if (responseOfLogin.message === "Login successful") {
          localStorage.setItem('token', responseOfLogin.token);
          navigate("/Dashboard", { state: { user: responseOfLogin.user } });
        }
      } catch (error) {
        console.error("Greška pri prijavljivanju:", error);
        alert('Netacan email ili lozinka!');
      }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Proveri validnost lozinke
    const isValidPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(value);
    // Postavi grešku na osnovu provere
    if (value.trim() === '' || !isValidPassword) {
        setPasswordError(true);
    } else {
        setPasswordError(false);
    }
 };

 const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Proveri validnost email adrese
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    // Postavi grešku na osnovu provere
    setEmailError(value.trim() === '' || !isValidEmail);
};


  return (
    <div className='body'>
        <h1>TAXI APLIKACIJA</h1>
        <div className='form'>
          <h2>Login</h2>
          <form onSubmit={handleLoginClick}>
              <input
                type="email" 
                placeholder="Email" 
                value={userEmail} 
                onChange={handleEmailChange} 
                required 
              /> <br/>
              <input 
                type="password" 
                placeholder="Password" 
                value={userPassword} 
                onChange={handlePasswordChange} 
                title='Lozinka treba da sadrži 8 znakova, jedno veliko slovo, jedan broj i jedan specijalni znak' 
                required 
              />
            <button type='submit'>Login</button>
          </form><br/><br/>
          <p className='p'>
            Don't have an account? 
            <a href="/Register">Register</a>
          </p>
          </div>
    </div>
  );
}


