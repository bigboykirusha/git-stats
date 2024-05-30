import React, { useState, useEffect } from 'react';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
   onFilterChange: (filterType: string, value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
   const [country, setCountry] = useState(() => localStorage.getItem('country') || 'all');
   const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'all');

   useEffect(() => {
      const storedCountry = localStorage.getItem('country') || 'all';
      if (country.toLowerCase() !== storedCountry.toLowerCase()) {
         localStorage.setItem('country', country.toLowerCase());
         onFilterChange('country', country.toLowerCase());
      }
   }, [country, onFilterChange]);

   useEffect(() => {
      const storedLanguage = localStorage.getItem('language') || 'all';
      if (language !== storedLanguage) {
         localStorage.setItem('language', language);
         onFilterChange('language', language);
      }
   }, [language, onFilterChange]);

   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCountry(e.target.value);
   };

   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value);
   };

   return (
      <div className={styles.filterPanel}>
         <select value={country} onChange={handleCountryChange}>
            <option value="all">All Countries</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Russia">Russia</option>
            <option value="China">China</option>
            <option value="Ukraine">Ukraine</option>
            {/* Add more countries as needed */}
         </select>
         <select value={language} onChange={handleLanguageChange}>
            <option value="all">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            {/* Add more languages as needed */}
         </select>
      </div>
   );
};

export default FilterPanel;
