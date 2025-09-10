import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './src/store/ThemeContext';

type Props = {
  name?: string;
};

export default function Header({ name = 'Alex' }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="app-header">
      <Link to="/" className="brand">BYOB - Bring Your Own Ball</Link>
      <div className="spacer" />
      <button className="icon-btn" title="Toggle theme" aria-label="Toggle theme" onClick={toggleTheme}>
        {isDark ? '🌙' : '☀️'}
      </button>
      <div className="profile-chip" title={name} aria-label={`Profile: ${name}`}>
        <div className="avatar" aria-hidden>{name.slice(0, 1).toUpperCase()}</div>
        <span className="name">{name}</span>
      </div>
    </header>
  );
}


