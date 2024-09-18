/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
//const SERVER_URL = 'http://localhost:8278';

class TripService {
    async createNewTrip(startingAddress, finalAddress, priceOfTheTrip, timeForTheTaxiToArrive, durationOfTheTrip) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${SERVER_URL}/trips/createNewTrip`, {
                startingAddress: startingAddress,
                finalAddress: finalAddress,
                priceOfTheTrip: priceOfTheTrip.toFixed(2),
                timeForTheTaxiToArrive: timeForTheTaxiToArrive.toFixed(2),
                durationOfTheTrip: durationOfTheTrip.toFixed(2)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + error.message);
        }
    }

    async getActiveTrips() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/trips/getActiveTrips`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + error.message);
        }
    }

    async getMyTrips() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/trips/getMyTrips`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + error.message);
        }
    }

    async getAllTrips() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authorization token found');
            }
            const response = await axios.get(`${SERVER_URL}/trips/getAllTrips`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + error.message);
        }
    }

    async getPassengersTrips() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/trips/getPassengersTrips`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + error.message);
        }
    }

    async acceptanceOfTrip(trip) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authorization token found');
            }
            const response = await axios.put(`${SERVER_URL}/trips/acceptTheTrip`, {
                id: trip.id,
                state: "Aktivan"
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + error.message);
        }
    }
/*
    async theTripHasEnded(trip) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${SERVER_URL}/trips/tripIsFinished`, {
                id: trip.id,
                state: "Završen"
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + error.message);
        }
    }*/
    async theTripHasEnded(trip) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authorization token found');
            }
            console.log('Sending request to end trip:', trip);
            const response = await axios.put(`${SERVER_URL}/trips/tripIsFinished`, {
                id: trip.id,
                state: "Završen"
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response from theTripHasEnded:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error in theTripHasEnded:', error);
            throw new Error('Došlo je do greške: ' + error.message);
        }
    }
    
}

export default new TripService();
