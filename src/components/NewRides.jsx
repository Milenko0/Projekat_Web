import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/NewRidesStyle.css'; 

export default function NewRides() {
  //const [rides, setRides] = useState([]);

  const [rides, setRides] = useState([
    {
      id: 1,
      startLocation: "123 Main St",
      endLocation: "456 Oak St",
      requestedTime: new Date().toISOString(),
    },
    {
      id: 2,
      startLocation: "789 Elm St",
      endLocation: "101 Maple St",
      requestedTime: new Date().toISOString(),
    },
    {
      id: 3,
      startLocation: "234 Pine St",
      endLocation: "678 Cedar St",
      requestedTime: new Date().toISOString(),
    }
  ]);


  useEffect(() => {
    // Fetch new rides that are waiting to be accepted
    const fetchNewRides = async () => {
      try {
        // Replace with your API endpoint to fetch new rides
        const response = await axios.get('https://api.example.com/driver/new-rides', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token for authentication
          }
        });
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching new rides:", error);
      }
    };

    fetchNewRides();
  }, []);

  const handleAcceptRide = async (rideId) => {
    try {
      // Replace with your API endpoint to accept a ride
      await axios.patch(`https://api.example.com/driver/accept-ride/${rideId}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      // Remove the accepted ride from the list
      setRides(rides.filter(ride => ride.id !== rideId));
    } catch (error) {
      console.error("Error accepting ride:", error);
    }
  };

  return (
    <div className="new-rides">
        <div className="header">
        <header>
            <Link to="/Profile">Profile</Link>
            <Link to="/NewRides">New Rides</Link>
            <Link to="/MyRides">My Rides</Link>
            <Link to="/">Log out</Link>
        </header>
        </div>
      <h2>New Rides</h2>
      {rides.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Requested Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rides.map(ride => (
              <tr key={ride.id}>
                <td>{ride.startLocation}</td>
                <td>{ride.endLocation}</td>
                <td>{new Date(ride.requestedTime).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleAcceptRide(ride.id)}>Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No new rides available.</p>
      )}
    </div>
  );
}