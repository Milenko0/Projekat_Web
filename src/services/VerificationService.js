import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
//const SERVER_URL = 'http://localhost:8278'

class VerificationService {
    async getData() {
        try {
            const response = await axios.get(`${SERVER_URL}/verification`);
            return response.data;
        } catch (error) {
            throw new Error('Greska: ' + error.message);
        }
    }

    async profileIsAccepted(userName, state) {
        try {
            const response = await axios.put(`${SERVER_URL}/verification/acceptProfile`, {
                userName: userName,
                state: state
            });
            return response.data;
        } catch (error) {
            throw new Error('Greska: ' + error.message);
        }
    }

    async profileIsRejected(userName, state) {
        try {
            console.log('Request data:', { userName, state });
            const response = await axios.put(`${SERVER_URL}/verification/rejectProfile`, {
                userName: userName,
                state: state
            });
            console.log('Response data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw new Error('Greska: ' + (error.response?.data || error.message));
        }
    }
    
}

export default new VerificationService();