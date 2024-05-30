import React, { useState, useEffect } from 'react';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
   onFilterChange: (filterType: string, value: string) => void;
   filters: {
      language: string;
      country: string;
   };
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, filters }) => {
   const [country, setCountry] = useState(filters.country);
   const [language, setLanguage] = useState(filters.language);
   const [sort, setSort] = useState('followers');

   useEffect(() => {
      onFilterChange('country', country);
   }, [country, onFilterChange]);

   useEffect(() => {
      onFilterChange('language', language);
   }, [language, onFilterChange]);

   useEffect(() => {
      onFilterChange('sort', sort);
   }, [sort, onFilterChange]);

   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCountry(e.target.value);
   };

   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value);
   };

   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(e.target.value);
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
         <select value={sort} onChange={handleSortChange}>
            <option value="followers">Followers</option>
            <option value="repositories">Repositories</option>
            <option value="joined">Joined Date</option>
         </select>
      </div>
   );
};

export default FilterPanel;
