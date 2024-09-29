import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterCard.css';
import { Link } from 'react-router-dom';

const RegisterCard = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        // Mock registration logic
        if (formData.firstName && formData.lastName && formData.email && formData.password) {
            // Display success message
            setSuccessMessage('You have registered successfully!');
            setTimeout(() => {
                // Redirect to home page after 2 seconds
                navigate('/');
            }, 2000);
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                <div className="register__inputs">
                    <div className="fname__input__container reg__input__container">
                        <label className="fname__label input__label">First name</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            className="fname__input register__input" 
                        />
                    </div>
                    <div className="lname__input__container reg__input__container">
                        <label className="lname__label input__label">Last name</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            className="lname__input register__input" 
                        />
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="email__input register__input" 
                            placeholder='example@gmail.com' 
                        />
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="password__input register__input" 
                        />
                    </div>
                    <div className="register__button__container">
                        <button className="register__button" onClick={handleRegister}>Create Account</button>
                    </div>
                </div>
                {successMessage && (
                    <div className="register__success__message">
                        {successMessage}
                    </div>
                )}
                <div className="register__other__actions">
                    <div className="register__login__account">Already have an account? <Link to="/account/login">Login</Link></div>
                </div>
            </div>
        </div>
    );
}

export default RegisterCard;
