import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [experience, setExperience] = useState("");
    const rating = 4;
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
            first_name,
            last_name,
            phone_number,
            city,
            state,
            image: image ? image : null,
            rating,
            experience,
            address,
        };

        let url = "http://localhost:8000/api/register/contractor/";
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };

        try {
            const res = fetch(url, options);
            if(res.ok) {
                const data = await res.json();
                console.log(data);
            }
            alert("Contractor Registered Successfully.");

            navigate("/ContractorRegister", {
                state: {email, password}
            });
            // navigate("/Login");
        } catch (error) {
            alert("Error during registration: " + error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Contractor Registration</h2>

            <label>First Name</label>
            <input
                type="text"
                value={first_name}
                placeholder="Enter your First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
            />

            <label>Last Name</label>
            <input
                type="text"
                value={last_name}
                placeholder="Enter your Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
            />

            <label>Email</label>
            <input
                type="email"
                value={email}
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label>Password</label>
            <input
                type="password"
                value={password}
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <label>Phone Number</label>
            <input
                type="text"
                value={phone_number}
                placeholder="Enter your Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />

            <label>Experience (in years)</label>
            <input
                type="number"
                value={experience}
                placeholder="Enter Experience"
                onChange={(e) => setExperience(e.target.value)}
                required
            />
            <br></br>
            <br></br>

            <label>City</label>
            <input
                type="text"
                value={city}
                placeholder="Enter your City"
                onChange={(e) => setCity(e.target.value)}
                required
            />

            <label>State</label>
            <input
                type="text"
                value={state}
                placeholder="Enter your State"
                onChange={(e) => setState(e.target.value)}
                required
            />

            <label>Address</label>
            <input
                type="text"
                value={address}
                placeholder="Enter your Address"
                onChange={(e) => setAddress(e.target.value)}
                required
            />

            <label>Profile Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            <button type="submit">Register</button>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Already have an account?{" "}
                <span
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/Login')}
                >
                    Login
                </span>
            </p>

        </form>
    );
}
