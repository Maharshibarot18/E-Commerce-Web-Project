import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './routes/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ManageAccount from './components/Account/ManageAccount/ManageAccount';
import MyAccount from './components/Account/MyAccount/MyAccount';
import Shop from './components/Shop/Shop';
import ItemView from './routes/ItemView';
import CategoryView from './routes/CategoryView';
import SearchView from './routes/Search';
import CartItemsProvider from './Context/CartItemsProvider';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import Wishlist from './components/Wishlist';
import WishItemsProvider from './Context/WishItemsProvider';
import DrawerNav from './components/Nav/DrawerNav/DrawerNav';
import Checkout from './components/Checkout/Checkout';
import CheckoutSuccess from './components/Checkout/checkoutSuccess';
import SearchProvider from './Context/SearchProvider';

function App() {
  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <SearchProvider>
          <Router>
            <Header />
            <DrawerNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/account/manage" element={<ManageAccount />} />
              <Route path="/account/login" element={<Login />} />
              <Route path="/account/register" element={<Register />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:id" element={<CategoryView />} />
              <Route path="/item">
                <Route path="men/:id" element={<ItemView />} />
                <Route path="women/:id" element={<ItemView />} />
                <Route path="kids/:id" element={<ItemView />} />
                <Route path="featured/:id" element={<ItemView />} />
              </Route>
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search/*" element={<SearchView />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              {/* Admin route */}
              <Route path="/admin" element={<Wishlist />} />
              {/* Catch-all route */}
              <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
          </Router>
        </SearchProvider>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;
