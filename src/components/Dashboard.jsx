import React from 'react';
import { useLocation } from 'react-router-dom';
import '../style/DashboardStyle.css';
import Profile from './Profile';
import NewRide from './NewRide';
import PreviousRides from './PreviousRides';
/*import Verification from './Verification';
import NewRides from './NewRides';
import MyRides from './MyRides';
import AllRides from './AllRides';*/


export default function Dashboard() {
  const location = useLocation();
  const user = location.state?.user;
  const userRole = user?.roles; 

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
          {/*<Verification user={user} />
          <AllRides user={user} />*/}
        </>
      )}

      {userRole === 2 && (
        <>
         {/* <NewRides user={user} />
          <MyRides user={user} />*/}
        </>
      )}
    </div>
  );
}