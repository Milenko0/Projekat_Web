//import React from 'react';
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../style/DashboardStyle.css';
import Profile from './Profile';
/*import NewRide from './NewTrip';
import PreviousRides from './PreviousTrips';
import Verification from './Verification';
import NewRides from './NewTrips';
import MyRides from './MyTrips';
import AllRides from './AllTrips';*/


export default function Dashboard() {
  const location = useLocation();
  const user = location.state?.user;
  const userRole = user?.roles; 
  //const userRole = 0;
  return (
    <div className="dashboard">
      <Profile user={user} />

     {/* {userRole === 1 && (
        <>
          <NewRide user={user} />
          <PreviousRides user={user} />
        </>
      )}

      {userRole === 0 && (
        <>
          <Verification user={user} />
          <AllRides user={user} />
        </>
      )}

      {userRole === 2 && (
        <>
          <NewRides user={user} />
          <MyRides user={user} />
        </>
      )}*/}
    </div>
  );/*
  return (
    <div className="dashboard">
      <Profile user={user} />
      <div className="dashboard-nav">
  <header>
  {userRole === 1 && (
    <>
      <Link to="/NewRide">New Ride</Link>
      <Link to="/PreviousRides">Previous Rides</Link>
    </>
  )}

  {userRole === 0 && (
    <>
      <Link to="/Verification">Verification</Link>
      <Link to="/AllRides">All Rides</Link>
    </>
  )}

  {userRole === 2 && (
    <>
      <Link to="/NewRides">New Rides</Link>
      <Link to="/MyRides">My Rides</Link>
    </>
  )}
  </header>
  </div>
</div>
  );*/
}