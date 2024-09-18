/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
//const SERVER_URL = 'http://localhost:8278';

class LoginService {
    async loginUser(logger) {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, {
                email: logger.email,
                password: logger.password
            });
            return response.data;
        } catch (error) {
            // Adjust error handling to work without AxiosError type
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

export default new LoginService();
