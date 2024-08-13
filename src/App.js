import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import NewRide from './components/NewRide';
import Verification from './components/Verification';
import PreviousRides from './components/PreviousRides';
import 'process/browser';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route  path="/" element={<Login />} />
                <Route  path="/Register" element={<Register />} />
                <Route  path='/Dashboard' element={<Dashboard />} />
                <Route  path='/Profile' element={<Profile />} />
                <Route  path='/NewRide' element={<NewRide />} />
                <Route  path='/Verification' element={<Verification />} />
                <Route  path='/PreviousRides' element={<PreviousRides />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
