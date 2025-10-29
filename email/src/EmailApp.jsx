import React, { useState, useEffect } from 'react';
import { emit, on, off } from './utils/event-bus';
import Button from './components/Button';
import './EmailApp.css';

const EmailApp = () => {
  const [emails, setEmails] = useState([
    {
      id: 1,
      subject: '🎉 Welcome to Email App',
      body: 'Your inbox is ready! Start receiving messages from Chat.',
      timestamp: new Date().toISOString(),
      read: false,
      sender: 'System',
    },
  ]);
  const [notification, setNotification] = useState('');
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    const handleEmailSend = (event) => {
      const { subject, body, timestamp } = event.detail || {};
      const newEmail = {
        id: Date.now(),
        subject: subject || '📨 New Email',
        body: body || 'Email received from Chat',
        timestamp: timestamp || new Date().toISOString(),
        read: false,
        sender: 'Chat App',
      };
      setEmails((prev) => [newEmail, ...prev]);
      setNotification('✨ New email just arrived!');
      setTimeout(() => setNotification(''), 3000);
    };

    on('email-send', handleEmailSend);
    return () => off('email-send', handleEmailSend);
  }, []);

  const handleOpenChat = () => {
    emit('open-chat', {
      message: `👋 Chat opened from Email at ${new Date().toLocaleTimeString()}`,
      source: 'email',
    });

    setNotification('🚀 Chat opened successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const markAsRead = (id) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, read: true } : email
      )
    );
  };

  const deleteEmail = (id) => {
    setEmails((prev) => prev.filter((email) => email.id !== id));
    if (selectedEmail?.id === id) setSelectedEmail(null);
  };

  const unreadCount = emails.filter((e) => !e.read).length;

  return (
    <div className="email-app bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-green-100 transform hover:scale-[1.01] transition-all duration-300">
      {/* Header */}
      <div className="email-header bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white p-6 rounded-xl -mx-6 -mt-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <span className="animate-bounce">📧</span>
              Email Application
            </h2>
            <p className="text-green-100 text-sm mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Live on Port 3002
            </p>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold">{unreadCount}</div>
            <div className="text-xs">Unread</div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-4 rounded-xl mb-4 animate-bounce shadow-lg flex items-center gap-3">
          <span className="text-2xl">🔔</span>
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inbox List */}
        <div className="inbox">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <span className="text-2xl">📥</span>
            Inbox
          </h3>
          <div className="emails-list space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
            {emails.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="text-6xl mb-4">📨</div>
                <div className="text-gray-400 font-medium">No emails yet</div>
                <div className="text-gray-300 text-sm">Your inbox is empty</div>
              </div>
            ) : (
              emails.map((email, index) => (
                <div
                  key={email.id}
                  onClick={() => {
                    setSelectedEmail(email);
                    if (!email.read) markAsRead(email.id);
                  }}
                  className={`email-item p-4 rounded-xl border-2 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                    email.read
                      ? 'bg-white border-gray-200 hover:border-gray-300'
                      : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 hover:border-green-400 shadow-md'
                  } ${
                    selectedEmail?.id === email.id ? 'ring-4 ring-green-300' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      {!email.read && (
                        <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-pulse"></span>
                      )}
                      <h4 className={`font-bold text-sm ${
                        email.read ? 'text-gray-600' : 'text-gray-800'
                      }`}>
                        {email.subject}
                      </h4>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(email.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className={`text-xs mb-2 ${
                    email.read ? 'text-gray-500' : 'text-gray-700 font-medium'
                  } truncate`}>
                    {email.body}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {email.sender}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Email Detail View */}
        <div className="email-detail">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            Email Details
          </h3>
          {selectedEmail ? (
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-200 transform transition-all duration-300">
              <div className="mb-4 pb-4 border-b-2 border-green-100">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{selectedEmail.subject}</h3>
                  {!selectedEmail.read && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">NEW</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">👤 From:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{selectedEmail.sender}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  🕒 {new Date(selectedEmail.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="mb-6">
                <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedEmail.body}
                </div>
              </div>
              <div className="flex gap-2">
                {!selectedEmail.read && (
                  <button
                    onClick={() => markAsRead(selectedEmail.id)}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    ✔️ Mark as Read
                  </button>
                )}
                <button
                  onClick={() => deleteEmail(selectedEmail.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl shadow-lg text-center border-2 border-dashed border-green-200">
              <div className="text-6xl mb-4">👈</div>
              <div className="text-gray-400 font-medium">Select an email</div>
              <div className="text-gray-300 text-sm">Click on any email to view details</div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions flex gap-3 mt-6">
        <button
          onClick={handleOpenChat}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-xl">💬</span>
          Open Chat
        </button>
        <button
          onClick={() => {
            const newEmail = {
              id: Date.now(),
              subject: '🎲 Test Email',
              body: 'This is a randomly generated test email to demonstrate the inbox functionality.',
              timestamp: new Date().toISOString(),
              read: false,
              sender: 'Test Bot',
            };
            setEmails((prev) => [newEmail, ...prev]);
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <span className="text-xl">✨</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl text-sm text-gray-700 border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <strong>Event Bus Active</strong>
          </div>
          <div className="text-xs">
            Listening: <span className="font-mono bg-white px-2 py-1 rounded">email-send</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailApp;
