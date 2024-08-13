import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/MyRidesStyle.css'; 

export default function MyRides() {
  //const [rides, setRides] = useState([]);
  const [rides] = useState([
    {
      id: 1,
      startLocation: 'Downtown',
      endLocation: 'Airport',
      date: '2023-08-01T10:30:00Z',
      price: 25,
    },
    {
      id: 2,
      startLocation: 'University',
      endLocation: 'Mall',
      date: '2023-08-02T14:00:00Z',
      price: 15,
    },
    {
      id: 3,
      startLocation: 'Park',
      endLocation: 'Hotel',
      date: '2023-08-03T18:00:00Z',
      price: 20,
    },
  ]);

  /*useEffect(() => {
    // Fetch previous rides that the driver has completed
    const fetchMyRides = async () => {
      try {
        // Replace with your API endpoint to fetch completed rides
        const response = await axios.get('https://api.example.com/driver/completed-rides', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token for authentication
          }
        });
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching my rides:", error);
      }
    };

    fetchMyRides();
  }, []);*/

  return (
    <div className="my-rides">
      <h2>My Completed Rides</h2>
      {rides.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rides.map(ride => (
              <tr key={ride.id}>
                <td>{ride.startLocation}</td>
                <td>{ride.endLocation}</td>
                <td>{new Date(ride.date).toLocaleDateString()}</td>
                <td>{ride.price} $</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No completed rides found.</p>
      )}
    </div>
  );
}