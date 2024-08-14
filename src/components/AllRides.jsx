import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/AllRidesStyle.css'; 

export default function AllRides() {
  /*const [rides, setRides] = useState([]);

  useEffect(() => {
    // Fetch all rides with their statuses
    const fetchAllRides = async () => {
      try {
        // Replace with your API endpoint to fetch all rides
        const response = await axios.get('https://api.example.com/admin/all-rides', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token for authentication
          }
        });
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching all rides:", error);
      }
    };

    fetchAllRides();
  }, []);*/

  const [rides, setRides] = useState([
    {
      id: 1,
      startLocation: 'Belgrade, Serbia',
      endLocation: 'Novi Sad, Serbia',
      date: '2024-08-12T14:00:00Z',
      price: 30,
      status: 'Completed',
    },
    {
      id: 2,
      startLocation: 'Niš, Serbia',
      endLocation: 'Kragujevac, Serbia',
      date: '2024-08-10T10:30:00Z',
      price: 25,
      status: 'In Progress',
    },
    {
      id: 3,
      startLocation: 'Subotica, Serbia',
      endLocation: 'Zrenjanin, Serbia',
      date: '2024-08-09T08:15:00Z',
      price: 20,
      status: 'Cancelled',
    },
  ]);

  return (
    <div className="all-rides">
        <div className="header">
        <header>
            <Link to="/Profile">Profile</Link>
            <Link to="/Verification">Verification</Link>
            <Link to="/AllRides">All Rides</Link>
            <Link to="/">Log out</Link>
        </header>
        </div>
      <h2>All Rides</h2>
      {rides.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.map(ride => (
              <tr key={ride.id}>
                <td>{ride.startLocation}</td>
                <td>{ride.endLocation}</td>
                <td>{new Date(ride.date).toLocaleDateString()}</td>
                <td>{ride.price} $</td>
                <td>{ride.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rides found.</p>
      )}
    </div>
  );
}