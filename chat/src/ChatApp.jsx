import React, { useState, useEffect } from 'react';
import { emit, on, off } from './utils/event-bus';
import Button from './components/Button';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to Chat! 👋', sender: 'System', time: new Date().toLocaleTimeString() },
  ]);
  const [notification, setNotification] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const handleOpenChat = (event) => {
      const { message } = event.detail || {};
      const newMessage = {
        id: Date.now(),
        text: message || 'Chat opened from Host',
        sender: 'Host',
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setNotification('✨ New message received!');
      setTimeout(() => setNotification(''), 3000);
    };

    on('open-chat', handleOpenChat);
    return () => off('open-chat', handleOpenChat);
  }, []);

  const handleSendEmail = () => {
    const emailMessage = `Email sent from Chat at ${new Date().toLocaleTimeString()}`;
    
    emit('email-send', {
      subject: '💬 Message from Chat',
      body: emailMessage,
      timestamp: new Date().toISOString(),
    });

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: '✅ Email sent successfully!',
        sender: 'System',
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: inputText, sender: 'You', time: new Date().toLocaleTimeString() },
      ]);
      setInputText('');
    }
  };

  return (
    <div className="chat-app bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-2xl p-6 max-w-2xl mx-auto border border-blue-100 transform hover:scale-[1.01] transition-all duration-300">
      {/* Header */}
      <div className="chat-header bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white p-6 rounded-xl -mx-6 -mt-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <span className="animate-bounce">💬</span>
              Chat Application
            </h2>
            <p className="text-blue-100 text-sm mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Live on Port 3001
            </p>
          </div>
          <div className="text-4xl opacity-20">💭</div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-4 rounded-xl mb-4 animate-bounce shadow-lg flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Messages List */}
      <div className="messages-list space-y-3 mb-6 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`message transform transition-all duration-500 hover:scale-[1.02] ${
              index === messages.length - 1 ? 'animate-slideIn' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {msg.sender === 'You' ? (
              // Your messages (right)
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-lg max-w-xs">
                  <div className="text-xs opacity-75 mb-1">{msg.time}</div>
                  <div className="font-medium">{msg.text}</div>
                </div>
              </div>
            ) : (
              // Other messages (left)
              <div className="flex justify-start">
                <div className={`p-4 rounded-2xl rounded-tl-sm shadow-md max-w-xs ${
                  msg.sender === 'System'
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-400'
                    : msg.sender === 'Host'
                    ? 'bg-gradient-to-r from-cyan-100 to-blue-100 border-l-4 border-cyan-400'
                    : 'bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-400'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-gray-700">
                      {msg.sender === 'System' ? '🤖' : msg.sender === 'Host' ? '🏠' : '👤'} {msg.sender}
                    </span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <div className="text-gray-800">{msg.text}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <span className="text-xl">📤</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="actions flex gap-3 mb-4">
        <button
          onClick={handleSendEmail}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:from-pink-600 hover:to-rose-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-xl">📧</span>
          Send to Email
        </button>
        <button
          onClick={() => {
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), text: '🎲 Random test message!', sender: 'System', time: new Date().toLocaleTimeString() },
            ]);
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <span className="text-xl">✨</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl text-sm text-gray-700 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <strong>Event Bus Active</strong>
          </div>
          <div className="text-xs">
            Listening: <span className="font-mono bg-white px-2 py-1 rounded">open-chat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
