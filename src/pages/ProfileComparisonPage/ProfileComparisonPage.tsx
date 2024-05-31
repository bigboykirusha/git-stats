import React, { useState } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { User } from '../../types';
import { fetchUserDetails } from '../../services/githubApi';
import styles from './ProfileComparisonPage.module.scss';

const ProfileComparisonPage: React.FC = () => {
   const [user1, setUser1] = useState<User | null>(null);
   const [user2, setUser2] = useState<User | null>(null);

   const handleUserSelect = async (url: string, setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
      const username = url.split('/').pop();
      if (username) {
         const userDetails = await fetchUserDetails(username);
         setUser(userDetails);
      }
   };

   const getWinnerClass = (value1: number, value2: number) => {
      if (value1 > value2) return styles.winner;
      if (value1 < value2) return styles.loser;
      return '';
   };

   return (
      <div className={styles.comparisonPage}>
         <div className={styles.profiles}>
            <ProfileCard
               user={user1}
               onUserSelect={(url: string) => handleUserSelect(url, setUser1)}
               onClear={() => setUser1(null)}
            />
            <ProfileCard
               user={user2}
               onUserSelect={(url: string) => handleUserSelect(url, setUser2)}
               onClear={() => setUser2(null)}
            />
         </div>
         {user1 && user2 && (
            <div className={styles.comparisonResults}>
               <h2>Comparison Results</h2>
               <div className={styles.comparisonItem}>
                  <div className={`${styles.comparisonField} ${getWinnerClass(user1.followers, user2.followers)}`}>
                     <span>Followers:</span> {user1.followers}
                  </div>
                  <div className={`${styles.comparisonField} ${getWinnerClass(user2.followers, user1.followers)}`}>
                     <span>Followers:</span> {user2.followers}
                  </div>
               </div>
               <div className={styles.comparisonItem}>
                  <div className={`${styles.comparisonField} ${getWinnerClass(user1.public_repos, user2.public_repos)}`}>
                     <span>Public Repositories:</span> {user1.public_repos}
                  </div>
                  <div className={`${styles.comparisonField} ${getWinnerClass(user2.public_repos, user1.public_repos)}`}>
                     <span>Public Repositories:</span> {user2.public_repos}
                  </div>
               </div>
               <div className={styles.comparisonItem}>
                  <div className={`${styles.comparisonField} ${getWinnerClass(user1.following, user2.following)}`}>
                     <span>Following:</span> {user1.following}
                  </div>
                  <div className={`${styles.comparisonField} ${getWinnerClass(user2.following, user1.following)}`}>
                     <span>Following:</span> {user2.following}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProfileComparisonPage;
