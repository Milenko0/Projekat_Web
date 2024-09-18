import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginService from '../services//LoginService';
import '../style/LoginStyle.css';

const Login = () => {
    const redirection = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function for validating fields and sending data to the server for login
    const userLoggingin = async () => {
        if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email) || !email.includes('@') || !email.includes('.')) {
            alert("Email must be filled out correctly!");
        }
        else if (password.length === 0 || password.length < 6) {
            alert("Password must be filled out and be at least 6 characters long!");
        }
        else {
            try {
                const response = await LoginService.loginUser({ email, password });
                if (response.message === '3') {
                    //alert('Successfully logged in as admin!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard');
                }
                else if (response.message === '2') {
                    //alert('Successfully logged in as driver!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard');
                }
                else if (response.message === '1') {
                    //alert('Successfully logged in as user!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard');
                }
                else if (response.message === '-1') {
                    alert('Incorrect password!');
                }
                else if (response.message === '-2') {
                    alert('You are not registered!');
                    redirection('/registration');
                }
                else {
                    alert('An error occurred!');
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    }

    return (
      <div className='body'>
        <h1>TAXI APLIKACIJA</h1>
        <div className='form'>
          <h2>Login</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    id="email"
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input 
                    id="password"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type='button' onClick={userLoggingin}>Login</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p className='p'>
            Don't have an account? 
            <a href="/Registration">Registration</a>
          </p>
        </div>
      </div>
    );    
}

export default Login;
