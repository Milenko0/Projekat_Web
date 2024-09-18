/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
//const SERVER_URL = 'http://localhost:8278';

const State = {
    Approved: 'Approved',
    Waiting: 'Waiting'
};

class RegistrationService {
    async registerUser(userData) {
        try {
            if (userData.userType === 'user') {
                userData.state = State.Approved;
            } else if (userData.userType === 'driver') {
                userData.state = State.Waiting;
            }

            const response = await axios.post(`${SERVER_URL}/registration`, {
                userName: userData.userName,
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                dateOfBirth: userData.dateOfBirth,
                address: userData.address,
                userType: userData.userType,
                image: userData.image,
                state: userData.state
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // Server-side error
                throw new Error('Došlo je do greške: ' + error.response.data.message);
            } else if (error.request) {
                // No response from server
                throw new Error('Došlo je do greške: No response from server');
            } else {
                // Error setting up request
                throw new Error('Došlo je do greške: ' + error.message);
            }
        }
    }

    async googleAccountLogin(name, email, familyName, givenName) {
        const user = {
            userName: name,
            email: email,
            firstName: givenName,
            lastName: familyName,
        };

        try {
            const response = await axios.post(`${SERVER_URL}/registration/googleAccountLogin`, {
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: 'user',
                state: State.Approved
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // Server-side error
                throw new Error('Došlo je do greške: ' + error.response.data.message);
            } else if (error.request) {
                // No response from server
                throw new Error('Došlo je do greške: No response from server');
            } else {
                // Error setting up request
                throw new Error('Došlo je do greške: ' + error.message);
            }
        }
    }
}

export default new RegistrationService();
