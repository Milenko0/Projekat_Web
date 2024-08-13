import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/NewRideStyle.css';

export default function NewRide({ user, onRideCreated }) {
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [predictedWaitTime, setPredictedWaitTime] = useState(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [driverArrivalCountdown, setDriverArrivalCountdown] = useState(null);
  const [rideEndCountdown, setRideEndCountdown] = useState(null);
  const [rating, setRating] = useState(null);
  const [rideAccepted, setRideAccepted] = useState(false);

  const handleOrderClick = async () => {
    // Pretend this is the API call to predict price and wait time
    const price = Math.random() * 50 + 10; // Random price between 10 and 60
    const waitTime = Math.random() * 15 + 5; // Random wait time between 5 and 20 minutes

    setPredictedPrice(price.toFixed(2));
    setPredictedWaitTime(Math.round(waitTime));
  };

  const handleConfirmClick = () => {
    setRideConfirmed(true);
    // Pretend API call to notify drivers
    onRideCreated({
      startAddress,
      endAddress,
      predictedPrice,
      predictedWaitTime,
      userId: user.id,
    });

    // Start driver arrival countdown
    const arrivalTime = Math.random() * 10 + 5; // Random arrival time between 5 and 15 minutes
    setDriverArrivalCountdown(Math.round(arrivalTime));
  };

  useEffect(() => {
    let arrivalInterval;
    let rideInterval;

    if (driverArrivalCountdown !== null) {
      arrivalInterval = setInterval(() => {
        setDriverArrivalCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(arrivalInterval);
            setRideAccepted(true);
            const rideTime = Math.random() * 20 + 10; // Random ride time between 10 and 30 minutes
            setRideEndCountdown(Math.round(rideTime));
          }
          return prev - 1;
        });
      }, 60000); // Decrement every minute
    }

    if (rideEndCountdown !== null) {
      rideInterval = setInterval(() => {
        setRideEndCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(rideInterval);
            // Ride finished
            setRideAccepted(false);
            setDriverArrivalCountdown(null);
            setRideEndCountdown(null);
          }
          return prev - 1;
        });
      }, 60000); // Decrement every minute
    }

    return () => {
      clearInterval(arrivalInterval);
      clearInterval(rideInterval);
    };
  }, [driverArrivalCountdown, rideEndCountdown]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleRatingSubmit = () => {
    // Pretend API call to submit rating
    alert(`You rated the driver ${rating} stars`);
  };

  return (
    <div className="new-ride-form">
      {!rideConfirmed ? (
        <>
          <h2>New Ride</h2>
          <input
            type="text"
            placeholder="Start Address"
            value={startAddress}
            onChange={(e) => setStartAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="End Address"
            value={endAddress}
            onChange={(e) => setEndAddress(e.target.value)}
          />
          <button onClick={handleOrderClick}>Order</button>
          {predictedPrice && predictedWaitTime && (
            <div>
              <p>Price: ${predictedPrice}</p>
              <p>Estimated Wait Time: {predictedWaitTime} minutes</p>
              <button onClick={handleConfirmClick}>Confirm</button>
            </div>
          )}
        </>
      ) : (
        <div>
          {rideAccepted ? (
            <>
              <h2>Ride in Progress</h2>
              {rideEndCountdown && (
                <p>Time to destination: {rideEndCountdown} minutes</p>
              )}
            </>
          ) : (
            <>
              <h2>Waiting for Driver</h2>
              {driverArrivalCountdown && (
                <p>Driver arrival in: {driverArrivalCountdown} minutes</p>
              )}
            </>
          )}
          {rideEndCountdown === null && (
            <div>
              <h3>Rate your Driver</h3>
              <select value={rating} onChange={handleRatingChange}>
                <option value="" disabled>Select Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
              <button onClick={handleRatingSubmit}>Submit Rating</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}