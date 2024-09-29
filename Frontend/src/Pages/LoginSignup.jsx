import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change made here
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Change made here

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user is logging in or signing up
    if (isLogin) {
      // Check if user exists
      const existingUser = users.find(user => user.username === username);
      if (existingUser) {
        if (existingUser.password === password) {
          // Successful login
          localStorage.setItem('auth-token', 'your-auth-token'); // Replace with actual token
          navigate('/'); // Change made here
        } else {
          alert('Incorrect password. Please try again.');
        }
      } else {
        alert('User does not exist. Please sign up.');
      }
    } else {
      // Sign-up process
      const existingUser = users.find(user => user.username === username);
      if (existingUser) {
        alert('User already exists. Please log in.');
      } else {
        // Create new user
        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign up successful! You can now log in.');
        setIsLogin(true); // Switch to login mode
      }
    }
  };

  return (
    <div className="login-signup-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
