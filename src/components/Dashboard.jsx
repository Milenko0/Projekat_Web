import React from 'react';
import { useLocation } from 'react-router-dom';
//import '../style/DashboardStyle.css';
import Profile from './Profile.jsx';
/*import NewRide from './NewRide.jsx';
import PreviousRides from './PreviousRides.jsx';
import Verification from './Verification.jsx';
import NewRides from './NewRides.jsx';
import MyRides from './MyRides.jsx';
import AllRides from './AllRides.jsx';*/


export default function Dashboard() {
  const location = useLocation();
  const user = location.state?.user;
  const userRole = user?.roles; 
/*
  return (
    <div className="dashboard">
      <Profile user={user} />

      {userRole === 1 && (
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
      )}
    </div>
  );*/
}