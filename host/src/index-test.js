import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';  // Full version with remote modules
import App from './App-Standalone';  // Standalone version for testing
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('Host app mounted successfully!');
console.log('If you see this message, React is working!');
