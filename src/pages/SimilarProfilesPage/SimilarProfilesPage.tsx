import React, { useState, useEffect } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { User } from '../../types';
import styles from './SimilarProfilesPage.module.scss';
import { fetchUserDetails, fetchAdditionalUserData } from '../../services/githubApi';
import { findSimilarProfiles } from '../../Utils/similarProfilesUtils';

const SimilarProfilesPage: React.FC = () => {
   const [url, setUrl] = useState('');
   const [user, setUser] = useState<User | null>(null);
   const [similarProfiles, setSimilarProfiles] = useState<User[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [allUsersLoaded, setAllUsersLoaded] = useState<boolean>(false);
   const [showInstructions, setShowInstructions] = useState(true);

   useEffect(() => {
      if (user) {
         handleLoadMore();
      }
   }, [user]);

   useEffect(() => {
      if (similarProfiles.length === 0) {
         setAllUsersLoaded(true);
      } else {
         setAllUsersLoaded(false);
      }
   }, [similarProfiles]);

   const handleUserSelect = async (url: string) => {
      setLoading(true);
      setError(null);
      try {
         const username = url.split('/').pop();
         if (username) {
            const userDetails = await fetchUserDetails(username);
            setUser(userDetails);
            setSimilarProfiles([]);
            setCurrentPage(1);
         }
      } catch (err) {
         setError('Ошибка при загрузке похожих профилей. Пожалуйста, попробуйте снова.');
      } finally {
         setLoading(false);
      }
   };

   const fetchAndFilterProfiles = async (user: User, page: number): Promise<User[]> => {
      try {
         const profiles = await findSimilarProfiles(user, page);
         const profilesWithAdditionalData = await Promise.all(
            profiles.map(async (profile) => {
               const additionalData = await fetchAdditionalUserData(profile.login);
               return { ...profile, ...additionalData };
            })
         );
         return profilesWithAdditionalData;
      } catch (error) {
         console.error('Ошибка при получении и фильтрации профилей:', error);
         throw error;
      }
   };

   const handleLoadMore = async () => {
      try {
         setLoading(true);
         const newProfiles = await fetchAndFilterProfiles(user!, currentPage);
         setSimilarProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
         setCurrentPage((prevPage) => prevPage + 1);
         setLoading(false);
         setShowInstructions(false);
      } catch (err) {
         setError('Ошибка при загрузке профилей. Пожалуйста, попробуйте снова.');
         setLoading(false);
      }
   };

   const handleClear = () => {
      setUser(null);
      setUrl('');
      setSimilarProfiles([]);
      setCurrentPage(1);
      setShowInstructions(true);
   };

   return (
      <div className={styles.similarProfilesPage}>
         <div className={styles.searchContainer}>
            <ProfileCard
               user={user}
               onUserSelect={handleUserSelect}
               onClear={handleClear}
               url={url}
               isMainUser={true}
            />
         </div>
         <p className={styles.line}></p>
         {loading && <p>Loading...</p>}
         {error && <p className={styles.error}>{error}</p>}
         {showInstructions && (
            <div className={styles.instructions}>
               <h2>How to Compare Similar Profiles</h2>
               <p>1. Enter the GitHub profile URL in the search box above.</p>
               <p>2. Click "Search" to load the profile details.</p>
               <p>3. View the similar profiles below the main profile card.</p>
               <p>4. Click "Load More" to see additional similar profiles.</p>
            </div>
         )}
         {similarProfiles.length > 0 && (
            <div className={styles.resultsContainer}>
               {similarProfiles.map((profile) => (
                  <ProfileCard
                     key={profile.id}
                     user={profile}
                     onUserSelect={() => { }}
                     onClear={() => { }}
                     url=""
                  />
               ))}
               <button
                  onClick={handleLoadMore}
                  disabled={allUsersLoaded}
                  className={styles.loadMoreButton}
               >
                  {allUsersLoaded ? 'Остальное за донат' : 'Загрузить еще'}
               </button>
            </div>
         )}
      </div>
   );
};

export default SimilarProfilesPage;
