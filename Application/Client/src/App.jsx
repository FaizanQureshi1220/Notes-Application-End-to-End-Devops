import React, { useEffect, useState } from 'react';
import AuthPage from './components/AuthPage';
import NotesPage from './components/NotesPage';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="app">
      {user ? (
        <NotesPage user={user} onLogout={handleLogout} />
      ) : (
        <AuthPage onAuth={handleLogin} />
      )}
    </div>
  );
}
