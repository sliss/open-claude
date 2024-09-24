import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mt-4">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'retro')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
        <option value="retro">Retro Mode</option>
      </select>
    </div>
  );
};

export default ThemeToggle;