import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/AllTripsStyle.css'; 
import TripService from '../services/TripService';

const AllTrips = () => {

  const redirection = useNavigate();
  const [trips, setTrips] = useState([]);

  // Protect the page and fetch all trips from the server
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          redirection('/');
          return;
      }
/*
      const fetchData = async () => {
          try {
              const response = await TripService.getAllTrips();
              const mappedTrips = response.map(trip => ({
                  Driver: trip.driver,
                  Passenger: trip.passenger,
                  StartingAddress: trip.startingAddress,
                  FinalAddress: trip.finalAddress,
                  PriceOfTheTrip: trip.priceOfTheTrip.replace('din', ''),
                  DurationOfTheTrip: trip.durationOfTheTrip.replace('min', ''),
                  State: trip.state
              }));
              setTrips(mappedTrips);
          } catch (error) {
              console.error('An error occurred: ', error);
          }
          
      };
      fetchData();
  }, [redirection]);
          try {
            const response = await TripService.getAllTrips();
            console.log("API Response:", response); // Log the response to inspect its structure
            
            // Assuming the response should be an array
            if (Array.isArray(response)) {
                setTrips(response); // Or whatever state update you need
            } else {
                console.error("Expected an array but got:", response);
                setTrips([]);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
      };
      fetchData();
    }, []);*/
        
    const fetchData = async () => {
      try {
        const response = await TripService.getAllTrips();
        console.log("API Response:", response); // Log the response to inspect its structure
        
        // Proveri da li je odgovor objekat i da li sadrži 'data' niz
        if (response && response.data && Array.isArray(response.data)) {
          const mappedTrips = response.data.map(trip => ({
            Driver: trip.driver,
            Passenger: trip.passenger,
            StartingAddress: trip.startingAddress,
            FinalAddress: trip.finalAddress,
            PriceOfTheTrip: trip.priceOfTheTrip.replace('din', ''),
            DurationOfTheTrip: trip.durationOfTheTrip.replace('min', ''),
            State: trip.state
          }));
          setTrips(mappedTrips);
        } else {
          console.error("Expected an array but got:", response);
          setTrips([]);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [redirection]);

  return (
    <div className="all-trips">
        <div className="header">
        <header>
            <Link to="/profile">Profile</Link>
            <Link to="/verification">Verification</Link>
            <Link to="/all-trips">All Trips</Link>
            <Link to="/ratings">Ratings</Link>
            <Link to="/">Log out</Link>
        </header>
        </div>
      <h2>All Trips</h2>
      {trips.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Passenger</th>
              <th>Start address</th>
              <th>End address</th>
              <th>Duration</th>
              <th>Price</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index}>
                <td>{trip.Driver}</td>
                <td>{trip.Passenger}</td>
                <td>{trip.StartingAddress}</td>
                <td>{trip.FinalAddress}</td>
                <td>{trip.DurationOfTheTrip}</td>
                <td>{trip.PriceOfTheTrip}</td>
                <td>{trip.State}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rides available.</p>
      )}
    </div>
  );
};

export default AllTrips;