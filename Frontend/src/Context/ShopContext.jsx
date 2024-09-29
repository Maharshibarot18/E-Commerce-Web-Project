import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// Initialize default cart with 30 items, all set to zero
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 31; index++) { // Fixed index to go from 0 to 30
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        // Load cart items from local storage when the app initializes
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCart) {
            setCartItems(storedCart);
        }

        // Fetch all products
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://backend-main-yi7u.onrender.com/allproduct');
                const data = await response.json();
                setAll_product(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();

        // Check for auth token and fetch cart items
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('https://backend-main-yi7u.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch cart items');
                    }
                    return response.json();
                })
                .then((data) => setCartItems(data))
                .catch((error) => console.error('Error fetching cart:', error));
        }
    }, []);

    useEffect(() => {
        // Update local storage whenever cartItems change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: prev[itemId] + 1 };
            // Update local storage whenever cartItems change
            localStorage.setItem('cartItems', JSON.stringify(newCart));
            return newCart;
        });
        
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('https://backend-main-yi7u.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to cart:', error));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) };
            // Update local storage whenever cartItems change
            localStorage.setItem('cartItems', JSON.stringify(newCart));
            return newCart;
        });
        
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('https://backend-main-yi7u.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error removing from cart:', error));
        }
    };

    const clearCart = () => {
        setCartItems(getDefaultCart());
        localStorage.setItem('cartItems', JSON.stringify(getDefaultCart()));
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((totalAmount, item) => {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                return totalAmount + (itemInfo ? itemInfo.new_price * cartItems[item] : 0);
            }
            return totalAmount;
        }, 0);
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((totalItem, quantity) => totalItem + quantity, 0);
    };

    const contextValue = { 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, // Added clearCart function
        getTotalCartAmount, 
        getTotalCartItems 
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
