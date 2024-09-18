import React, { useState } from 'react';
import RatingService from '../services/RatingService';
import '../style/DriverRatingStyle.css'

const RatingDriverModal = ({ show, onClose, driver }) => {

    const [driverRating, setDriverRating] = useState({
        driver: driver,
        rating: 0,
    });

    // Function to set the rating value
    const handleRatingChange = (value) => {
        setDriverRating({ ...driverRating, rating: value });
    };

    // Function to handle driver rating submission
    const handleSubmit = async () => {
        if (driverRating.rating !== 0) {
            driverRating.driver = driver;
            const response = await RatingService.rateDriver(driverRating);
            if (response.message === "1") {
               // alert("Hvala što ste odvojili vreme da ocenite vozača!");
                onClose();
                window.location.reload();
            }
        } else {
            console.log("Došlo je do greške!");
            onClose();
            window.location.reload();
        }
    };

    // Function to handle rating cancellation
    const cancelHandleSubmit = () => {
        onClose();
        window.location.reload();
    };

    return (
        show && (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Ocenite uslugu</h4>
                        <button onClick={onClose}>x</button>
                    </div>
                    <div className="modal-body">
                        <p>Molimo vas ocenite uslugu vozača:</p>
                        <div className="rating-options">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={value}
                                        checked={driverRating.rating === value}
                                        onChange={() => handleRatingChange(value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="confirm" onClick={handleSubmit}>Potvrdi</button>
                        <button className="cancel" onClick={cancelHandleSubmit}>Odustani</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default RatingDriverModal;
