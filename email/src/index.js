import React from 'react';
import ReactDOM from 'react-dom/client';
import EmailApp from './EmailApp';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <EmailApp />
    </div>
  </React.StrictMode>
);
