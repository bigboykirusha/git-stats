import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Header.module.scss';

const Header: React.FC = () => {
   const { theme, toggleTheme } = useTheme();
   const [isMenuActive, setMenuActive] = useState(false);

   useEffect(() => {
      if (isMenuActive) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'auto';
      }
   }, [isMenuActive]);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   const toggleMenu = () => {
      setMenuActive(prevState => !prevState);
   };

   const closeMenu = () => {
      setMenuActive(false);
   };

   return (
      <header className={`${styles.header} ${isMenuActive ? styles.active : ""}`}>
         <Link to="/" onClick={() => { scrollToTop(); closeMenu(); }}>
            <div className={styles.header__logo}>
               <h1>Git Stats</h1>
            </div>
         </Link>
         <div className={styles.header__navbar}>
            <Link to="/compare-profiles" className={styles.header__button}>
               Battle
            </Link>
            <Link to="/similar-profiles" className={styles.header__button}>
               Git-Tinder
            </Link>
         </div>
         <div className={styles.buttons}>
            <button className={styles.themeToggle} onClick={toggleTheme}>
               {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className={`${styles.burgerMenu} ${isMenuActive ? styles.active : ""}`} onClick={toggleMenu}>
               <div className={`${styles.burgerBar} ${styles.bar1}`}></div>
               <div className={`${styles.burgerBar} ${styles.bar2}`}></div>
               <div className={`${styles.burgerBar} ${styles.bar3}`}></div>
            </div>
         </div>
         {isMenuActive && (
            <div className={styles.fullscreenMenu}>
               <div className={styles.fullscreenMenu__content}>
                  <Link to="/compare-profiles" className={styles.fullscreenMenu__link} onClick={closeMenu}>
                     Battle
                  </Link>
                  <Link to="/similar-profiles" className={styles.fullscreenMenu__link} onClick={closeMenu}>
                     Git-Tinder
                  </Link>
               </div>
            </div>
         )}
      </header>
   );
};

export default Header;
