import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TripService from '../services/TripService';
import '../style/PreviousTripsStyle.css'; 

const PreviousTrips = () => {
    const redirection = useNavigate();
    const [trips, setTrips] = useState([]);

    // Function to protect the page and fetch previous trips from the server
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/');
        }

        const fetchData = async () => {
            try {
                const response = await TripService.getPassengersTrips();
                setTrips(response.data);
            } catch (error) {
                console.error('An error occurred: ', error);
            }
        };
        fetchData();
    }, []);

  return (
    <div className="previous-trips">
       <div className="header">
            <header>
                <Link to="/profile">Profile</Link>
                <Link to="/new-trip">New Trip</Link>
                <Link to="/previous-trips">Previous Trips</Link>
                <Link to="/">Log out</Link>
            </header>
        </div> 
      <h2>Previous Trips</h2>
      {trips.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Start address</th>
              <th>End address</th>
              <th>Time duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index}>
                <td>{trip.startingAddress}</td>
                <td>{trip.finalAddress}</td>
                <td>{trip.durationOfTheTrip.replace('min', '')} min</td>
                <td>{trip.priceOfTheTrip.replace('din', '')} din</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No trips available.</p>
      )}
    </div>
  );
};

export default PreviousTrips;