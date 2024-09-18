import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialMinutes = 0, onTimeUp, type, startImmediately }) => {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [timeUp, setTimeUp] = useState(false);

    useEffect(() => {
        if (initialMinutes > 0) {
            setTimeLeft(initialMinutes * 60);
            setTimeUp(false);
        }
    }, [initialMinutes]);

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeUp(true);
            setTimeout(onTimeUp, 2000);
            return;
        }

        if (startImmediately) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft, onTimeUp, startImmediately]);

    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="timer-container">
            <h3>{type}</h3>
            {timeUp ? <span>Vreme je isteklo!</span> : formatTime(timeLeft)}
        </div>
    );
};

export default CountdownTimer;
