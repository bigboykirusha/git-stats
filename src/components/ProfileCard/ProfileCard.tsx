import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileCard.module.scss';
import { User } from '../../types';

interface ProfileCardProps {
   user: User | null;
   onUserSelect: (url: string) => void;
   onClear: () => void;
   className?: string;
   url: string;
   isMainUser?: boolean; // Новый пропс для различия основного пользователя
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
            <div>
               <img src={user.avatar_url} alt={user.login} onClick={handleAvatarClick} />
               <h3>{user.login}</h3>
               <p>{user.bio}</p>
               {user.twitter_username && (
                  <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                     Twitter
                  </a>
               )}
               {user.blog && (
                  <a href={user.blog} target="_blank" rel="noopener noreferrer">
                     LinkedIn
                  </a>
               )}
               {isMainUser && <button onClick={onClear}>Clear</button>}
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
