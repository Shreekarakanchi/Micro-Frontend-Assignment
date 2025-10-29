import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatApp from './ChatApp';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <ChatApp />
    </div>
  </React.StrictMode>
);
