import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Header.module.scss';

const Header: React.FC = () => {
   const { theme, toggleTheme } = useTheme();

   return (
      <header className={styles.header}>
         <h1>GitHub Users</h1>
         <button onClick={toggleTheme}>
            {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
         </button>
      </header>
   );
};

export default Header;
