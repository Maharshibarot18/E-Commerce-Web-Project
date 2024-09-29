import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css'; // Ensure you have this CSS for styling

const ThankYou = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect after 5 seconds
        const timer = setTimeout(() => {
            navigate('/'); // Redirect to the home/shop page
        }, 5000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="thank-you">
            <h1>Thank You for Your Order!</h1>
            <p>Your payment was successful. We appreciate your business.</p>
            <p>Check your email for confirmation and further details.</p>
            <p>You will be redirected to the shop page in 5 seconds.</p>
            <a href="/" className="return-to-shop">Return to Shop</a> {/* Link to return to home or shop page */}
        </div>
    );
};

export default ThankYou;
