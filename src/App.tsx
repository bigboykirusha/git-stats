// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserProfile from './components/UserProfile/UserProfile';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
