import React, { useEffect, useState } from 'react';
import TripService from '../services/TripService';
import '../style/ModalStyle.css';

const ConfirmationOfNewTrip = ({ showModal, handleOpenModal, handleCloseModal, sAddress, fAddress }) => {

    const [pricePerKilometer] = useState(90.0);
    const [startingPrice] = useState(190.0);
    const [priceOfTheTrip, setPriceOfTheTrip] = useState(0.0);
    const [durationOfTheTrip, setDurationOfTheTrip] = useState(0.0);
    const [timeForTheTaxiToArrive, setTimeForTheTaxiToArrive] = useState(0.0);

    // Function to return a random number for distance
    function getRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    // Function to return a random number for trip duration
    function getRandomMinute() {
        //return 0.5;
        return Math.floor(Math.random() * 26) + 5;
    }

    // Function to return a random number for taxi arrival time
    function getRandomMinuteForTaxiToArrive() {
        //return 0.5;
        return Math.floor(Math.random() * 6) + 3;
    }

    // Function to set values for dynamic display
    useEffect(() => {
        setPriceOfTheTrip(startingPrice + (getRandomNumber() * pricePerKilometer));
        setDurationOfTheTrip(getRandomMinute());
        setTimeForTheTaxiToArrive(getRandomMinuteForTaxiToArrive());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sAddress, fAddress]);

    // Function to handle new trip confirmation
    const newTripConfirmation = async () => {
        const response = await TripService.createNewTrip(sAddress, fAddress, priceOfTheTrip, timeForTheTaxiToArrive, durationOfTheTrip);
        if (response.message === '1') {
           // alert('Uspešno ste kreirali novu vožnju!');
            handleCloseModal();
        } else {
            alert('Došlo je do greške tokom obrade podataka!');
            handleCloseModal();
        }
    }

    // Function to handle cancellation of new trip
    const cancelingNewTrip = () => {
       // alert('Odustali ste od nove vožnje!');
        handleCloseModal();
        window.location.reload();
    }

    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Potvrda nove vožnje</h4>
                    <button onClick={handleCloseModal}>x</button>
                </div>
                <div className="modal-body">
                    <p>Cena vožnje sa adrese {sAddress} na adresu {fAddress} je: {priceOfTheTrip} dinara.</p>
                    <p>Vreme potrebno da taxi stigne do vas je: {timeForTheTaxiToArrive} minuta.</p>
                    <p>Trajanje vožnje sa adrese {sAddress} na adresu {fAddress} je: {durationOfTheTrip} minuta.</p>
                </div>
                <div className="modal-footer">
                    <button className="button confirm" onClick={newTripConfirmation}>Potvrdi</button>
                    <button className="button cancel" onClick={cancelingNewTrip}>Odustani</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationOfNewTrip;
