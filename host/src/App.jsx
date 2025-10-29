import React, { Suspense, lazy } from 'react';
import { emit } from './utils/event-bus';
import Button from './components/Button';
import './App.css';

// Lazy load remote micro-frontends
const ChatApp = lazy(() => import('chat/ChatApp'));
const EmailApp = lazy(() => import('email/EmailApp'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading micro-frontend...</span>
  </div>
);

const ErrorBoundary = ({ children, name }) => {
  return (
    <div className="error-boundary">
      <Suspense
        fallback={
          <div className="bg-gray-100 rounded-lg p-8">
            <LoadingSpinner />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

function App() {
  const handleOpenChat = () => {
    emit('open-chat', {
      message: 'Chat opened from Host Application',
      timestamp: new Date().toISOString(),
    });
  };

  const handleSendEmail = () => {
    emit('email-send', {
      subject: 'Message from Host',
      body: 'This email was sent from the Host application',
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="app min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold mb-2">🏠 Micro-Frontend Host</h1>
          <p className="text-purple-100">
            React 18 + Webpack 5 Module Federation Demo
          </p>
          <div className="mt-4 text-sm bg-purple-800 bg-opacity-50 rounded p-3">
            <strong>Port 3000</strong> | Loading Chat (3001) & Email (3002)
          </div>
        </div>
      </header>

      {/* Control Panel */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            🎮 Control Panel
          </h2>
          <p className="text-gray-600 mb-4">
            Dispatch events to communicate with micro-frontends:
          </p>
          <div className="flex gap-4">
            <Button onClick={handleOpenChat} variant="primary">
              💬 Dispatch open-chat Event
            </Button>
            <Button onClick={handleSendEmail} variant="success">
              📧 Dispatch email-send Event
            </Button>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-400">
            <h3 className="font-semibold text-blue-900 mb-2">
              📡 Communication Flow
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                <strong>Host → Chat:</strong> open-chat event
              </li>
              <li>
                <strong>Chat → Email:</strong> email-send event
              </li>
              <li>
                <strong>Email → Chat:</strong> open-chat event
              </li>
            </ul>
          </div>
        </div>

        {/* Micro-Frontends Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat Micro-Frontend */}
          <div className="micro-frontend-container">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-t-lg">
              <h3 className="font-semibold">Chat Micro-Frontend (Port 3001)</h3>
              <p className="text-xs text-blue-100">
                Remote: chat@http://localhost:3001/remoteEntry.js
              </p>
            </div>
            <div className="bg-white p-4 rounded-b-lg shadow-md">
              <ErrorBoundary name="Chat">
                <ChatApp />
              </ErrorBoundary>
            </div>
          </div>

          {/* Email Micro-Frontend */}
          <div className="micro-frontend-container">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-t-lg">
              <h3 className="font-semibold">Email Micro-Frontend (Port 3002)</h3>
              <p className="text-xs text-green-100">
                Remote: email@http://localhost:3002/remoteEntry.js
              </p>
            </div>
            <div className="bg-white p-4 rounded-b-lg shadow-md">
              <ErrorBoundary name="Email">
                <EmailApp />
              </ErrorBoundary>
            </div>
          </div>
        </div>

        {/* Architecture Info */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            🏗️ Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Host App</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>✓ React 18</li>
                <li>✓ Webpack 5 Module Federation</li>
                <li>✓ Lazy loading with Suspense</li>
                <li>✓ Event-based communication</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Chat App</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Exposes ./ChatApp</li>
                <li>✓ Listens: open-chat</li>
                <li>✓ Emits: email-send</li>
                <li>✓ Tailwind styled</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Email App</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ Exposes ./EmailApp</li>
                <li>✓ Listens: email-send</li>
                <li>✓ Emits: open-chat</li>
                <li>✓ Tailwind styled</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">
            Built with React 18, Webpack 5 Module Federation & Tailwind CSS
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Singleton React/React-DOM across all micro-frontends
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
