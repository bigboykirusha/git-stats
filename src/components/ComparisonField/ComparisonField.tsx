import React from 'react';
import styles from './ComparisonField.module.scss';

interface ComparisonFieldProps {
   label: string;
   value1: number;
   value2: number;
   isStarsField?: boolean;
   comparisonResult?: { winner: string | null; loser: string | null };
}

const ComparisonField: React.FC<ComparisonFieldProps> = ({ label, value1, value2, isStarsField, comparisonResult }) => {
   const getFieldClass = (value1: number, value2: number) => {
      if (value1 > value2) return styles.winner;
      if (value1 < value2) return styles.loser;
      return '';
   };

   return (
      <div className={styles.comparisonItem}>
         <div className={`${styles.comparisonField} ${getFieldClass(value1, value2)}`}>
            <span>{label}:</span> {value1}
         </div>
         <div className={`${styles.comparisonField} ${getFieldClass(value2, value1)}`}>
            <span>{label}:</span> {value2}
         </div>
      </div>
   );
};

export default ComparisonField;
