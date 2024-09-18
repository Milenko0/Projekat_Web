import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import '../style/TimerStyle.css';

const CountdownTimerModal = ({ show, onHide, title, initialMinutesArrival, initialMinutesRide }) => {
    const [startRideTimer, setStartRideTimer] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'Molimo vas sačekajte dok istekne tajmer!';
        };

        if (show) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        } else {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [show]);

    if (!show) return null;

    const handleArrivalTimeUp = () => {
        console.log('Arrival time is up!');
        setStartRideTimer(true);
    };

    const handleRideTimeUp = () => {
        console.log('Ride time is up!');
        // Additional actions when ride time is up
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="titleStyle">{title}</h2>
                    <button className="close-button" onClick={onHide}>×</button>
                </div>
                <div className="modal-body">
                    <CountdownTimer
                        initialMinutes={initialMinutesArrival}
                        onTimeUp={handleArrivalTimeUp}
                        type="Dolazak taksija"
                        startImmediately={!startRideTimer}
                    />
                    {startRideTimer && (
                        <CountdownTimer
                            initialMinutes={initialMinutesRide}
                            onTimeUp={handleRideTimeUp}
                            type="Vreme vožnje"
                            startImmediately={startRideTimer}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CountdownTimerModal;
