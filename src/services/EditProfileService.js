/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
//const SERVER_URL = 'http://localhost:8278';

class ProfileService {
    async getProfileData() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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

    async editProfile(profileData) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${SERVER_URL}/profile`, {
                userName: profileData.userName,
                email: profileData.email,
                password: profileData.password,
                passwordCheck: profileData.passwordCheck,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                dateOfBirth: profileData.dateOfBirth,
                address: profileData.address,
                userType: profileData.userType,
                image: profileData.image,
                state: profileData.state
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
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
    }/*
    async editProfile(profileData) {
        try {
            const token = localStorage.getItem('token');
            let data = new FormData();
    
            // Dodaj sve podatke u FormData
            data.append('userName', profileData.userName);
            data.append('email', profileData.email);
            data.append('password', profileData.password);
            data.append('passwordCheck', profileData.passwordCheck);
            data.append('firstName', profileData.firstName);
            data.append('lastName', profileData.lastName);
            data.append('dateOfBirth', profileData.dateOfBirth);
            data.append('address', profileData.address);
            data.append('userType', profileData.userType);
            data.append('state', profileData.state);
            
            // Ako postoji slika, dodaj je u FormData
            if (profileData.image) {
                data.append('image', profileData.image);
            }
    
            const response = await axios.put(`${SERVER_URL}/profile`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Ne postavljaj Content-Type, axios i browser će automatski postaviti multipart/form-data
                },
            });
    
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('HTTP status: ', error.response.status);
                console.error('Odgovor servera: ', error.response.data);
    
                const errorMessage = error.response.data?.message || 'Neidentifikovana greška na serveru';
                throw new Error('Došlo je do greške: ' + errorMessage);
            } else if (error.request) {
                throw new Error('Došlo je do greške: Nema odgovora sa servera');
            } else {
                throw new Error('Došlo je do greške: ' + error.message);
            }
        }
    }*/
}

export default new ProfileService();
