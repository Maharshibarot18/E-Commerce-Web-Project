import React, { useContext, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { ShopContext } from "../../Context/ShopContext";
import "./PayPalButton.css"; // Import the CSS file for styling

const PayPalButton = () => {
    const { getTotalCartAmount } = useContext(ShopContext);
    const [errorMessage, setErrorMessage] = useState(null); // State for error message
    const navigate = useNavigate(); // Initialize navigate function

    const handleApprove = () => {
        alert('Payment Successful');
        navigate('/thank-you'); // Redirect to thank you page
    };

    const handleError = (err) => {
        if (err.message.includes("CANNOT_BE_ZERO_OR_NEGATIVE")) {
            setErrorMessage("Sorry, but you need to add something to your cart.");
        } else {
            setErrorMessage("Payment failed. Please try again.");
        }
        console.error('PayPal Checkout onError', err);
    };

    return (
        <div className="paypal-button-container"> {/* Container for centering */}
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Render error message if exists */}
            <PayPalScriptProvider options={{ "client-id": "ASRkCH3ZB9mxFRmAMYPe0P0o0kXqpP_lO4kZM-WUqbjmr8dNBTSURoudRgfFfsSso3pr_lE0hoN186W3" }}>
                <PayPalButtons
                    style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
                    createOrder={(data, actions) => {
                        const totalAmount = getTotalCartAmount().toFixed(2);
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalAmount,
                                },
                            }],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        handleApprove(order.id);
                    }}
                    onError={handleError} // Handle error
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default PayPalButton;
