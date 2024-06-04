import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTwitter, FaLinkedin } from 'react-icons/fa'; // Импортируем иконки Twitter и LinkedIn
import styles from './ProfileCard.module.scss';
import { User } from '../../types';

interface ProfileCardProps {
   user: User | null;
   onUserSelect: (url: string) => void;
   onClear: () => void;
   className?: string;
   url: string;
   isMainUser?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onUserSelect, onClear, className, url, isMainUser }) => {
   const [inputValue, setInputValue] = useState(url);
   const navigate = useNavigate();

   useEffect(() => {
      setInputValue(url);
   }, [url]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   };

   const handleButtonClick = () => {
      onUserSelect(inputValue);
   };

   const handleAvatarClick = () => {
      if (user) {
         navigate(`/profile/${user.login}`);
      }
   };

   return (
      <div className={`${styles.profileCard} ${className}`}>
         {user ? (
            <div className={styles.profileContent}>
               <img src={user.avatar_url} alt={user.login} onClick={handleAvatarClick} />
               <div className={styles.userInfo}>
                  <h3>{user.login}</h3>
                  {user.location && <p className={styles.userLocation}>{user.location}</p>}
                  {user.bio && <p className={styles.bio}>{user.bio}</p>}
                  <div className={styles.userStats}>
                     <span>Repos: {user.public_repos}</span>
                     <span>Followers: {user.followers}</span>
                  </div>
                  <div className={styles.links}>
                     {user.twitter_username && (
                        <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                           <FaTwitter className={styles.icon} /> Twitter
                        </a>
                     )}
                     {user.blog && (
                        <a href={user.blog} target="_blank" rel="noopener noreferrer">
                           <FaLinkedin className={styles.icon} /> LinkedIn
                        </a>
                     )}
                  </div>
                  {isMainUser && <div className={styles.clearButton} onClick={onClear}>X</div>}
               </div>
            </div>
         ) : (
            <div>
               <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter GitHub URL" />
               <button onClick={handleButtonClick}>Load</button>
            </div>
         )}
      </div>
   );
};

export default ProfileCard;
