import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RatingCard from '../components/RatingCard';
import RatingService from '../services/RatingService';
import '../style/RatingStyle.css';

const Ratings = () => {
  const redirection = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Prijem podataka o ocenama vozača sa servera
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirection('/');
      return;
    }

    const fetchData = async () => {
      try {
          const response = await RatingService.getRatingeData();
          console.log("API Response:", response); // Proveri šta API vraća
  
          // Ako je response niz, postavi ga u stanje
          if (Array.isArray(response)) {
              setData(response);
          } else {
              console.error("Očekivao sam niz, ali sam dobio:", response);
              setData([]);
          }
      } catch (error) {
          console.error("Došlo je do greške: ", error);
          setData([]);
      }
  };
    fetchData();
  }, [redirection]);

  return (
    <div>
      <div className="header">
        <header>
          <Link to="/profile">Profile</Link>
          <Link to="/verification">Verification</Link>
          <Link to="/all-trips">All Trips</Link>
          <Link to="/ratings">Ratings</Link>
          <Link to="/">Log out</Link>
        </header>
      </div>
      <div className='rating'>
        {error && <p>{error}</p>}
        {data.length > 0 ? (
          data.map((rating, index) => (
            <RatingCard key={index} rating={rating} />
          ))
        ) : (
          <p>No ratings available.</p>
        )}
      </div>
    </div>
  );
};

export default Ratings;
