import React, { useState, useEffect } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { User, ComparisonResult } from '../../types';
import styles from './ProfileComparisonPage.module.scss';
import { compareUsers } from '../../Utils/comparisonUtils';
import { handleClearUser, handleUserSelect } from '../../Utils/profileUtils';
import ComparisonField from '../../components/ComparisonField/ComparisonField';

const ProfileComparisonPage: React.FC = () => {
   const [user1, setUser1] = useState<User | null>(null);
   const [user2, setUser2] = useState<User | null>(null);
   const [comparisonResult, setComparisonResult] = useState<ComparisonResult>({ winner: null, loser: null, stars1: 0, stars2: 0 });
   const [showResults, setShowResults] = useState(false);
   const [url1, setUrl1] = useState('');
   const [url2, setUrl2] = useState('');
   const [showInstructions, setShowInstructions] = useState(true);

   useEffect(() => {
      if (user1 && user2 && showResults) {
         compareUsers(user1, user2, setComparisonResult, setShowResults);
      }
   }, [user1, user2, showResults]);

   const getCardClass = (user: 'user1' | 'user2') => {
      if (!showResults) return '';
      if (comparisonResult.winner === user) return styles.winnerCard;
      if (comparisonResult.loser === user) return styles.loserCard;
      return '';
   };

   const handleCompare = () => {
      setShowInstructions(false);
      compareUsers(user1!, user2!, setComparisonResult, setShowResults);
   };

   return (
      <div className={styles.comparisonPage}>
         <div className={styles.profiles}>
            <ProfileCard
               user={user1}
               onUserSelect={(url: string) => handleUserSelect(url, setUser1, setUrl1, setShowResults, setComparisonResult)}
               onClear={() => handleClearUser(setUser1, setUrl1, setShowResults, setComparisonResult)}
               className={getCardClass('user1')}
               url={url1}
               isMainUser={true}
            />
            <ProfileCard
               user={user2}
               onUserSelect={(url: string) => handleUserSelect(url, setUser2, setUrl2, setShowResults, setComparisonResult)}
               onClear={() => handleClearUser(setUser2, setUrl2, setShowResults, setComparisonResult)}
               className={getCardClass('user2')}
               url={url2}
               isMainUser={true}
            />
         </div>
         {user1 && user2 && (
            <button onClick={handleCompare} className={styles.compareButton}>Compare</button>
         )}
         {showInstructions && (
            <div className={styles.instructions}>
               <h2>How to Compare Profiles</h2>
               <p>1. Enter the URL of the first GitHub profile.</p>
               <p>2. Enter the URL of the second GitHub profile.</p>
               <p>3. Click the "Compare" button to see the comparison results.</p>
            </div>
         )}
         {showResults && (
            <div className={styles.comparisonResults}>
               <h2>Comparison Results</h2>
               <ComparisonField label="Public Repositories" value1={user1!.public_repos} value2={user2!.public_repos} />
               <ComparisonField label="Followers" value1={user1!.followers} value2={user2!.followers} />
               <ComparisonField label="Stars" value1={comparisonResult.stars1} value2={comparisonResult.stars2} isStarsField comparisonResult={comparisonResult} />
            </div>
         )}
      </div>
   );
};

export default ProfileComparisonPage;
