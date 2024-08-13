import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/PreviousRidesStyle.css'; 

export default function PreviousRides() {
  //const [rides, setRides] = useState([]);

  const [rides, setRides] = useState([
    {
      id: 1,
      startLocation: "New York, NY",
      endLocation: "Los Angeles, CA",
      date: "2023-08-10T14:48:00.000Z",
      price: 120
    },
    {
      id: 2,
      startLocation: "Chicago, IL",
      endLocation: "Miami, FL",
      date: "2023-07-15T10:30:00.000Z",
      price: 85
    },
    {
      id: 3,
      startLocation: "Houston, TX",
      endLocation: "Dallas, TX",
      date: "2023-06-20T08:15:00.000Z",
      price: 45
    }
  ]);


  useEffect(() => {
    // Funkcija za učitavanje prethodnih vožnji sa servera
    const fetchPreviousRides = async () => {
      try {
        // Pretpostavimo da postoji API endpoint za dohvaćanje vožnji korisnika
        const response = await axios.get('https://api.example.com/user/rides', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token za autentifikaciju
          }
        });
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching previous rides:", error);
      }
    };

    fetchPreviousRides();
  }, []);

  return (
    <div className="previous-rides">
      <h2>Previous Rides</h2>
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
        <p>No previous rides found.</p>
      )}
    </div>
  );
}