import React from 'react';
import CartItems from '../Components/CartItems/CartItems';
import PayPalButton from '../Components/PaymentGateway/PayPalButton';
// import './Cart.css'; // Import CSS for styling

const Cart = () => {
    return (
        <div className='cart'>
            <CartItems />
            <PayPalButton />
        </div>
    );
};

export default Cart;
