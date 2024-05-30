// MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
