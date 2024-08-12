import axios from "axios";
import { SHA256 } from 'crypto-js';

// Funkcija za validaciju
function validateRegistrationData(formData) {
    const errors = [];

    if (!formData.firstName) {
        errors.push("First Name is required");
    }
    if (!formData.lastName) {
        errors.push("Last Name is required");
    }
    if (!formData.birthday) {
        console.log("Birthday field is empty:", formData.birthday);
        errors.push("Birthday is required");
    } else {
        const age = new Date().getFullYear() - new Date(formData.birthday).getFullYear();
        if (age < 18) {
            errors.push("You must be older than 18");
        }
    }
    if (!formData.address) {
        errors.push("Address is required");
    }
    if (!formData.username) {
        errors.push("Username is required");
    }
    if (!formData.email) {
        errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.push("This is not a valid email!");
    }
    if (!formData.password) {
        errors.push("Password is required");
    } else if (formData.password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }
    if (!formData.repeatPassword) {
        errors.push("Repeat Password is required");
    } else if (formData.password !== formData.repeatPassword) {
        errors.push("Passwords do NOT match!");
    }
    if (!formData.imageUrl) {
        errors.push("Image is required");
    }

    return errors;
}

// API poziv za registraciju
export async function RegularRegisterApiCall(
    formData,
    apiEndpoint
) {
    try {
        // Validacija podataka
        const errors = validateRegistrationData(formData);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false; // Registracija neuspešna
        }

        const form = new FormData();
        form.append('firstName', formData.firstName);
        form.append('lastName', formData.lastName);
        form.append('birthday', formData.birthday);
        form.append('address', formData.address);
        form.append('email', formData.email);
        form.append('password', SHA256(formData.password).toString());
        form.append('typeOfUser', formData.userType);
        form.append('username', formData.username);
        form.append('imageUrl', formData.imageUrl);

        const response = await axios.post(apiEndpoint, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return true; // Registracija uspešna
    } catch (error) {
        if (error.response && error.response.status === 409) {
            alert(error.response.data + "\nTry another email!!!");
        } else {
            alert("An error occurred during registration. Please try again later.");
        }
        return false; // Registracija neuspešna
    }
}