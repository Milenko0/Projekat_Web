/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
//const SERVER_URL = 'http://localhost:8278';

class RatingService {
    async getRatingeData() {
        try {
            const response = await axios.get(`${SERVER_URL}/rating`);
            const data = response.data;
    
            // Proveri da li je data prazan string i konvertuj ga u prazan niz ako jeste
            if (typeof data === 'string' && data.trim() === '') {
                return []; // Vraća prazan niz ako je data prazan string
            }
    
            // Pretpostavljamo da je data niz ili objekat sa nizom u nekoj osobini
            if (Array.isArray(data)) {
                return data; // Ako je data niz, vrati ga
            }
    
            // Ako data nije niz, možeš da loguješ ili obradiš drugačije
            throw new Error("Očekivao sam niz, ali sam dobio: " + JSON.stringify(data));
        } catch (error) {
            if (error.response) {
                throw new Error('Došlo je do greške: ' + error.response.data.message);
            } else if (error.request) {
                throw new Error('Došlo je do greške: No response from server');
            } else {
                throw new Error('Došlo je do greške: ' + error.message);
            }
        }
    }

    async rateDriver(driverRating) {
        try {
            const response = await axios.post(`${SERVER_URL}/rating`, {
                driver: driverRating.driver,
                rating: driverRating.rating
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

    async blockDriver(driver) {
        try {
            const response = await axios.put(`${SERVER_URL}/rating/blockDriver`, {
                driver: driver
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

    async unblockDriver(driver) {
        try {
            const response = await axios.put(`${SERVER_URL}/rating/unblockDriver`, {
                driver: driver
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

export default new RatingService();
