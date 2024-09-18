import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/NewTripStyle.css';
import ConfirmationOfNewTrip from '../components/Modal';
import CountdownTimerModal from '../components/CountdownTimerModal';
import { HubConnectionBuilder } from '@microsoft/signalr';
import RatingDriverModal from '../components/DriverRating';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NewTrip = () => {
    const redirection = useNavigate();
    const [startingAddress, setStartingAddress] = useState("");
    const [finalAddress, setFinalAddress] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [timerDurationArrival, setTimerDurationArrival] = useState(0);
    const [timerDurationRide, setTimerDurationRide] = useState(0);
    const [showTimerModal, setShowTimerModal] = useState(false);
    const [showModalRatings, setShowModalRatings] = useState(false);
    const [driverForRatings, setDriverForRatings] = useState("");
    const [driverToModal, setDriverToModal] = useState("");
    const [isRideInProgress, setIsRideInProgress] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/');
        }
    }, [redirection]);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleCloseModalRatings = () => setShowModalRatings(false);

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl(`${SERVER_URL}/new-trip`)
            .build();

        hubConnection.start()
            .then(() => {
                console.log('Successfully connected to SignalR hub!');
                hubConnection.on('TripAccepted', async (message) => {
                    console.log('Message received from SignalR hub:', message.timeForTheTaxiToArrive, message.result);

                    setDriverToModal(message.result.driver);
                    const timeForTheTaxiToArriveNumber = parseFloat(message.timeForTheTaxiToArrive);
                    const durationInMinutes = parseInt(message.result.durationOfTheTrip.replace('min', ''));
                    setTimerDurationArrival(Math.round(timeForTheTaxiToArriveNumber));
                    setTimerDurationRide(Math.round(durationInMinutes));
                    setIsRideInProgress(true); // Vožnja je započela
                    setShowTimerModal(true);

                    await wait(((timeForTheTaxiToArriveNumber + durationInMinutes) * 60 * 1000) + 10000);
                    setIsRideInProgress(false); // Vožnja je završena
                    if (!driverForRatings) {
                        const driver = message.result.driver;
                        handleShowModalRatingsAsync(driver);
                    }
                });
            })
            .catch((error) => {
                console.error('Error connecting to SignalR hub:', error);
            });

        return () => {
            if (hubConnection) {
                hubConnection.stop();
            }
        };
    }, [driverForRatings]);

    const handleShowModalRatingsAsync = (driver) => {
        setDriverToModal(driver);
        setShowModalRatings(true);
    }

    const creatingNewTrip = async () => {
        if (startingAddress.length === 0) {
            alert("Starting address must be filled out!");
        } else if (finalAddress.length === 0) {
            alert("Final address must be filled out!");
        } else {
            handleOpenModal();
        }
    }

    const handleCountdownEnd = () => {
        setShowTimerModal(false);
        setIsRideInProgress(false); // Vožnja završena, omogućiti kreiranje nove vožnje
    };

    return (
        <div className="new-trip-form">
            <div className="header">
                {!isRideInProgress && ( // Skriva navigaciju ako je vožnja u toku
                    <header>
                        <Link to="/profile">Profile</Link>
                        <Link to="/new-trip">New Trip</Link>
                        <Link to="/previous-trips">Previous Trips</Link>
                        <Link to="/">Log out</Link>
                    </header>
                )}
            </div>
            {!isRideInProgress ? ( // Prikazuje formu za kreiranje vožnje samo ako nema aktivne vožnje
                <div>
                    <h2>New Trip</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Start address"
                                        value={startingAddress}
                                        onChange={(e) => setStartingAddress(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Final address"
                                        value={finalAddress}
                                        onChange={(e) => setFinalAddress(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={creatingNewTrip}>Order</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ConfirmationOfNewTrip
                        showModal={showModal}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        sAddress={startingAddress}
                        fAddress={finalAddress}
                    />
                </div>
            ) : (
                <CountdownTimerModal
                    show={showTimerModal}
                    onHide={handleCountdownEnd}
                    initialMinutesArrival={timerDurationArrival}
                    initialMinutesRide={timerDurationRide}
                />
            )}
            <RatingDriverModal
                show={showModalRatings}
                onClose={handleCloseModalRatings}
                driver={driverToModal}
            />
        </div>
    );
};

export default NewTrip;
