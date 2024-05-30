// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Header.module.scss';

const Header: React.FC = () => {
   const { theme, toggleTheme } = useTheme();

   return (
      <header className={styles.header}>
         <nav className={styles.nav}>
            <ul className={styles.navList}>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/compare-profiles">Compare Profiles</Link>
               </li>
               <li>
                  <Link to="/similar-profiles">Similar Profiles</Link>
               </li>
               <li>
                  <Link to="/repository/:repoId">Repository</Link>
               </li>
            </ul>
            <button className={styles.themeToggle} onClick={toggleTheme}>
               Switch to {theme === 'light' ? 'dark' : 'light'} mode
            </button>
         </nav>
      </header>
   );
};

export default Header;
