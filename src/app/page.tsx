'use client';

import Chatbot from '../components/Chatbot';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`h-screen w-full ${theme === 'dark' ? 'dark' : ''} ${theme === 'retro' ? 'retro' : ''}`}>
      <main className={`h-full w-full overflow-hidden flex ${
        theme === 'retro' ? 'bg-yellow-300 font-comic-sans' : ''
      }`}>
        <div className={`w-1/3 p-4 ${
          theme === 'light' ? 'bg-gray-100' :
          theme === 'dark' ? 'bg-gray-800' :
          'bg-blue-500 border-4 border-red-500'
        }`}>
          {theme === 'retro' ? (
            <marquee className="text-2xl font-bold text-red-500">Open Claude</marquee>
          ) : (
            <h1 className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' :
              theme === 'dark' ? 'text-white' :
              'text-yellow-300'
            }`}>Open Claude</h1>
          )}
          <ThemeToggle />
          {/* You can add additional content or navigation here */}
        </div>
        <div className="w-2/3">
          <Chatbot />
        </div>
      </main>
    </div>
  );
}
