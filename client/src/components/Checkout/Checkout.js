import React, { useEffect } from 'react';
import axios from 'axios';

const Checkout = ({ amount }) => {
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.addEventListener('load', initializePayment);
      document.body.appendChild(script);
    };

    const initializePayment = async () => {
      try {
        const { data } = await axios.post('/api/payments/create-order', {
          amount: amount,
        });

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key
          amount: data.amount,
          currency: data.currency,
          name: 'Your Company Name',
          description: 'Test Transaction',
          order_id: data.id,
          handler: async function (response) {
            try {
              await axios.post('/api/payments/verify-payment', {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
              alert('Checkout is completed!');
              window.location.href = '/checkout-success'; // Redirect to a success page
            } catch (error) {
              console.error('Payment verification error:', error);
              alert('Payment verification error.');
            }
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '1234567890',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error('Error initializing payment:', error);
        alert('Error initializing payment.');
      }
    };

    loadRazorpayScript();
  }, [amount]);

  return (
    <div>
      <h2>Checkout</h2>
      <p>Redirecting to payment page...</p>
    </div>
  );
};

export default Checkout;
