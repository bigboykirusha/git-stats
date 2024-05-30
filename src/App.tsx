// App.tsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserProfile from './components/UserProfile/UserProfile';
import ProfileComparisonPage from './pages/ProfileComparisonPage/ProfileComparisonPage';
import SimilarProfilesPage from './pages/SimilarProfilesPage/SimilarProfilesPage';
import { useTheme } from './contexts/ThemeContext';

const App: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="/compare-profiles" element={<ProfileComparisonPage />} />
      <Route path="/similar-profiles" element={<SimilarProfilesPage />} />
    </Routes>
  );
}

export default App;
