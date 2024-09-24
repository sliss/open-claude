'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`h-full flex flex-col ${
      theme === 'light' ? 'bg-white' :
      theme === 'dark' ? 'bg-gray-900' :
      'bg-green-300 border-4 border-purple-500'
    }`}>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : theme === 'light' ? 'bg-gray-200 text-gray-900' 
                : theme === 'dark' ? 'bg-gray-700 text-white'
                : 'bg-yellow-300 text-blue-700 border-2 border-red-500'
            } max-w-[80%] ${theme === 'retro' ? 'font-comic-sans' : ''}`}>
              {message.content}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="mb-4 text-left">
            <span className={`inline-block p-3 rounded-lg ${
              theme === 'light' ? 'bg-gray-200' :
              theme === 'dark' ? 'bg-gray-700' :
              'bg-pink-300 border-2 border-blue-500'
            }`}>
              <TypingAnimation theme={theme} />
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className={`flex-shrink-0 p-4 ${
        theme === 'light' ? 'bg-gray-50' :
        theme === 'dark' ? 'bg-gray-800' :
        'bg-orange-300 border-t-4 border-blue-500'
      }`}>
        <div className={`flex border-2 ${
          theme === 'light' ? 'border-gray-300' :
          theme === 'dark' ? 'border-gray-600' :
          'border-purple-500'
        } rounded-lg overflow-hidden`}>
          <input
            className={`flex-grow appearance-none bg-transparent border-none w-full ${
              theme === 'light' ? 'text-gray-700' :
              theme === 'dark' ? 'text-gray-200' :
              'text-blue-700 font-comic-sans'
            } py-3 px-4 leading-tight focus:outline-none`}
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className={`${
              theme === 'retro'
                ? 'bg-red-500 hover:bg-red-700 text-yellow-300 font-bold py-3 px-6 focus:outline-none focus:shadow-outline border-2 border-blue-500'
                : 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 focus:outline-none focus:shadow-outline'
            }`}
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

const TypingAnimation: React.FC<{ theme: 'light' | 'dark' | 'retro' }> = ({ theme }) => (
  <div className="flex space-x-1">
    <div className={`w-2 h-2 ${
      theme === 'light' ? 'bg-gray-500' :
      theme === 'dark' ? 'bg-gray-400' :
      'bg-red-500'
    } rounded-full animate-bounce`} style={{ animationDelay: '0s' }}></div>
    <div className={`w-2 h-2 ${
      theme === 'light' ? 'bg-gray-500' :
      theme === 'dark' ? 'bg-gray-400' :
      'bg-blue-500'
    } rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
    <div className={`w-2 h-2 ${
      theme === 'light' ? 'bg-gray-500' :
      theme === 'dark' ? 'bg-gray-400' :
      'bg-green-500'
    } rounded-full animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
  </div>
);

export default Chatbot;