import axios from "axios";
import { SHA256 } from 'crypto-js';


export async function AuthenticateUser(userEmail, userPassword, loginApiUrl) {
    try {
        const response = await axios.post(loginApiUrl, {
            email: userEmail,
            password: SHA256(userPassword).toString()
        });
        return response.data;
    } catch (error) {
        console.error('Greska pri pozivanju API za autentifikaciju korisnika:', error);
    }
}

