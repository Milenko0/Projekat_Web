import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/VerificationStyle.css';

export default function DriversList() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Funkcija za učitavanje vozača sa servera
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('https://api.example.com/drivers');
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const handleApprove = async (driverId) => {
    try {
      await axios.patch(`https://api.example.com/drivers/${driverId}`, { status: 'Approved' });
      setDrivers(drivers.map(driver => driver.id === driverId ? { ...driver, status: 'Approved' } : driver));
    } catch (error) {
      console.error("Error approving driver:", error);
    }
  };

  const handleReject = async (driverId) => {
    try {
      await axios.patch(`https://api.example.com/drivers/${driverId}`, { status: 'Rejected' });
      setDrivers(drivers.map(driver => driver.id === driverId ? { ...driver, status: 'Rejected' } : driver));
    } catch (error) {
      console.error("Error rejecting driver:", error);
    }
  };

  return (
    <div className="drivers-list">
        <div className="header">
        <header>
            <Link to="/Profile">Profile</Link>
            <Link to="/Verification">Verification</Link>
            <Link to="/AllRides">All Rides</Link>
            <Link to="/">Log out</Link>
        </header>
        </div>
      <h2>Drivers List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.status}</td>
              <td>
                {driver.status !== 'Approved' && (
                  <button onClick={() => handleApprove(driver.id)}>Approve</button>
                )}
                {driver.status !== 'Rejected' && (
                  <button onClick={() => handleReject(driver.id)}>Reject</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}