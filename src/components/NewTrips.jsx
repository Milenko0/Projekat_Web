import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TripService from '../services/TripService';
import CountdownTimerModal from './CountdownTimerModal';
import '../style/NewTripsStyle.css'; 

const NewTrips = () => {
  const redirection = useNavigate();
  const [trips, setTrips] = useState([]);
  const [timerDuration, setTimerDuration] = useState(0);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [timerDurationArrival, setTimerDurationArrival] = useState(0);
  const [timerDurationRide, setTimerDurationRide] = useState(0);
  const [isRideInProgress, setIsRideInProgress] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          redirection('/');
          return;
      }

      const fetchData = async () => {
          try {
              const response = await TripService.getActiveTrips();
              if (response.message === '3' || response.message === '2') {
                  redirection('/dashboard');
              } else if (response.message === '1') {
                  setTrips(response.data);
              } else {
                  console.log('An error occurred!');
                  redirection('/dashboard');
              }
          } catch (error) {
              redirection('/dashboard');
              console.error('An error occurred: ', error);
          }
      };
      fetchData();
  }, [redirection]);

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const takeTheTrip = async (trip) => {
      try {
          const response = await TripService.acceptanceOfTrip(trip);
          if (response.message === "1") {
              const timeForTheTaxiToArriveNumber = parseFloat(response.timeForTheTaxiToArrive);
              const timeForTheTaxiToArriveInt = Math.round(timeForTheTaxiToArriveNumber);
              const durationInMinutes = parseInt(trip.durationOfTheTrip.replace('min', ''));
             // setTimerDuration(timeForTheTaxiToArriveInt + durationInMinutes);
              setTimerDurationArrival(Math.round(timeForTheTaxiToArriveNumber));
              setTimerDurationRide(Math.round(durationInMinutes));
              setIsRideInProgress(true);
              setShowTimerModal(true);

              // Wait until the time is up
              await wait(((timeForTheTaxiToArriveInt + durationInMinutes) * 60 * 1000) + 7500);

              // Update trip status to finished
              const result = await TripService.theTripHasEnded(trip);
              if (result.message === "1") {
                 // alert('The trip has ended!');
                  // Reload data or redirect if needed
                  window.location.reload();
              } else {
                  alert('An error occurred!');
              }
          } else {
              alert('An error occurred!');
          }
      } catch (error) {
          console.error('An error occurred: ', error);
      }
  };

  const handleCountdownEnd = () => {
    setShowTimerModal(false);
    setIsRideInProgress(false); // Vožnja završena, omogućiti kreiranje nove vožnje
};

  return (
    <div className="new-trips">
        <div className="header">
        {!isRideInProgress && (
            <header>
                <Link to="/profile">Profile</Link>
                <Link to="/new-trips">New Trips</Link>
                <Link to="/my-trips">My Trips</Link>
                <Link to="/">Log out</Link>
            </header>
        )}
        </div>
        {!isRideInProgress ? (
          <div>
        <h2>New Trips</h2>
        {trips.length > 0 ? (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Passenger</th>
                            <th>Start address</th>
                            <th>End address</th>
                            <th>Requested time</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip, index) => (
                            <tr key={index}>
                                <td>{trip.passenger}</td>
                                <td>{trip.startingAddress}</td>
                                <td>{trip.finalAddress}</td>
                                <td>{trip.durationOfTheTrip.replace('min', '')} min</td>
                                <td>{trip.priceOfTheTrip.replace('din', '')} din</td>
                                <td>
                                    <button onClick={() => takeTheTrip(trip)}>Accept</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
        ) : (
            <p>No new trips available.</p>
        )}
        </div>
        ) : (
          <CountdownTimerModal
          show={showTimerModal}
          onHide={handleCountdownEnd}
          initialMinutesArrival={timerDurationArrival}
          initialMinutesRide={timerDurationRide}
      />
        )}
    </div>
  );
};

export default NewTrips;
