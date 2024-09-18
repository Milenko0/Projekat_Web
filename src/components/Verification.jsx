import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/VerificationStyle.css';
import VerificationService from '../services/VerificationService';
import VerificationCard from './VerificationCard';

const Verification = () => {
  const redirection = useNavigate();
  const [data, setData] = useState([]);

  // Funkcija za zaštitu stranice i prijem svih korisnika u sistemu sa servera
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          redirection('/login');
          return;
      }

      const fetchData = async () => {
          try {
              const response = await VerificationService.getData();
              setData(response);
          } catch (error) {
              console.error('Došlo je do greške: ', error);
          }
      };
      fetchData();
  }, []);

  
  return (
    <div className="drivers-list">
        <div className="header">
        <header>
            <Link to="/profile">Profile</Link>
            <Link to="/verification">Verification</Link>
            <Link to="/all-trips">All Trips</Link>
            <Link to="/ratings">Ratings</Link>
            <Link to="/">Log out</Link>
        </header>
        </div>
        <div>
                {data.map((user, index) => (
                    <VerificationCard key={index} user={user} />
                ))}
            </div>
    </div>
  );
};


export default Verification;