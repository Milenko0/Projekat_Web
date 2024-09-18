import React, { useState, useEffect } from "react";
import VerificationService from '../services/VerificationService';
import '../style/VerificationCardStyle.css'

const VerificationCard = ({ user }) => {
    const hiddenPassword = user.password.replace(/./g, '*');
    const showButtons = user.state === "Waiting";
    const [state, setState] = useState("");
    const [buttonsState, setButtonsState] = useState(true);

    // Funkcija koja real-time ažurira stanje profila korisnika
    useEffect(() => {
        setState(user.state);
    }, [user.state]);

    // Funkcija za obradu prihvatanja profila korisnika
    const acceptProfile = async () => {
        setState("Approved");
        setButtonsState(false);
        try {
            const response = await VerificationService.profileIsAccepted(user.userName, "Approved");
            if (response.message === '1') {
               // alert('Uspešno je odobren profil!');
            } else {
                alert('Došlo je do greške!');
            }
        } catch (error) {
            console.error('Došlo je do greške: ', error);
        }
    }

    // Funkcija za obradu odbijanja profila korisnika
    const rejectProfile = async () => {
        setState("Rejected");
        console.log(user);
        try {
            const response = await VerificationService.profileIsRejected(user.userName, "Rejected");
            if (response.message === '1') {
               // alert('Uspešno je odbijen profil!');
            } else {
                alert('Došlo je do greške!');
            }
        } catch (error) {
            console.error('Došlo je do greške: ', error);
        }
    }

    return (
        <div className="verification-card">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div>Account verification</div>
                </li>
                <li className="list-group-item">
                    <span>Username:</span>
                    <span>{user.userName}</span>
                </li>
                <li className="list-group-item">
                    <span>Email:</span>
                    <span>{user.email}</span>
                </li>
                <li className="list-group-item">
                    <span>Password:</span>
                    <span>{hiddenPassword.substring(0, 6)}</span>
                </li>
                <li className="list-group-item">
                    <span>First Name:</span>
                    <span>{user.firstName}</span>
                </li>
                <li className="list-group-item">
                    <span>Last Name:</span>
                    <span>{user.lastName}</span>
                </li>
                <li className="list-group-item">
                    <span>Date of Birth:</span>
                    <span>{user.dateOfBirth}</span>
                </li>
                <li className="list-group-item">
                    <span>Address:</span>
                    <span>{user.address}</span>
                </li>
                <li className="list-group-item">
                    <span>User Type:</span>
                    <span>{user.userType}</span>
                </li>
                <li className="list-group-item">
                    <span>Status:</span>
                    <span>{state}</span>
                </li>
                <li className="list-group-item image">
                    <img src={user.image} className="card-img-top" alt={user.userName} />
                </li>
                {showButtons && buttonsState && (
                    <li className="list-group-item buttons-container">
                        <button className="accept" onClick={acceptProfile}>Accept</button>
                        <button className="reject" onClick={rejectProfile}>Reject</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default VerificationCard;
