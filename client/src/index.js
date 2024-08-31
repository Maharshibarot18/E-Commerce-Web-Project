// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './app/App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Render the App component directly, as there's no need for Stripe Elements
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
