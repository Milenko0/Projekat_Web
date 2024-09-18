import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/MyTripsStyle.css'; 
import TripService from '../services/TripService';

const MyTrips = () => {

  const redirection = useNavigate();
  const [trips, setTrips] = useState([]);

  // Protect the page and fetch my previous trips from the server
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          redirection('/');
          return;
      }

      const fetchData = async () => {
          try {
              const response = await TripService.getMyTrips();
              console.log(response); 
              setTrips(response.data);
          } catch (error) {
              console.error('An error occurred: ', error);
          }
      };
      fetchData();
  }, [redirection]); // Added redirection to the dependencies array

  return (
    <div className="my-trips">
        <div className="header">
        <header>
            <Link to="/profile">Profile</Link>
            <Link to="/new-trips">New Trips</Link>
            <Link to="/my-trips">My Trips</Link>
            <Link to="/">Log out</Link>
        </header>
        </div>
      <h2>My Completed Trips</h2>
      {trips.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Passenger</th>
              <th>Start address</th>
              <th>End address</th>
              <th> Time duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index}>
                <td>{trip.passenger}</td>
                <td>{trip.startingAddress}</td>
                <td>{trip.finalAddress}</td>
                <td>{trip.durationOfTheTrip.replace('min','')} min</td>
                <td>{trip.priceOfTheTrip.replace('din','')} din</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No completed trips available.</p>
      )}
    </div>
  );
};

export default MyTrips;