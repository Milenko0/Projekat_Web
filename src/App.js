import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Registration from './components/Registration';
import Profile from './components/Profile';
import NewTrip from './components/NewTrip';
import Verification from './components/Verification';
import PreviousTrips from './components/PreviousTrips';
import NewTrips from './components/NewTrips';
import MyTrips from './components/MyTrips';
import AllTrips from './components/AllTrips';
import Ratings from './components/Ratings';
import Logout from './components/Logout'
import 'process/browser';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const clientId='process.env.REACT_APP_CLIENT_ID';

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
    <>
        <Router>
            <Routes>
                <Route  path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route  path="/registration" element={<Registration />} />
                <Route  path='/dashboard' element={<Dashboard />} />
                <Route  path='/profile' element={<Profile />} />
                <Route  path='/new-trip' element={<NewTrip />} />
                <Route  path='/verification' element={<Verification />} />
                <Route  path='/previous-trips' element={<PreviousTrips />} />
                <Route  path='/new-trips' element={<NewTrips />} />
                <Route  path='/my-trips' element={<MyTrips />} />
                <Route  path='/all-trips' element={<AllTrips />} />
                <Route  path='/ratings' element={<Ratings />} />
                <Route  path='/logout' element={<Logout />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
