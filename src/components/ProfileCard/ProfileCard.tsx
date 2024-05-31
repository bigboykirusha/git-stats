import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import './ProfileCard.scss';

interface ProfileCardProps {
   user: User | null;
   onUserSelect: (url: string) => void;
   onClear: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onUserSelect, onClear }) => {
   const [inputVisible, setInputVisible] = useState(false);
   const [url, setUrl] = useState('');
   const navigate = useNavigate();

   const handleButtonClick = () => {
      setInputVisible(true);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
   };

   const handleSubmit = () => {
      onUserSelect(url);
      setInputVisible(false);
   };

   const handleClose = () => {
      setInputVisible(false);
   };

   const handleClear = () => {
      onClear();
   };

   const handleAvatarClick = () => {
      if (user) {
         navigate(`/profile/${user.login}`);
      }
   };

   return (
      <div className="profile-card">
         {user ? (
            <div>
               <div className="profile-header">
                  <img
                     src={user.avatar_url}
                     alt={user.login}
                     width="100"
                     className="profile-avatar"
                     onClick={handleAvatarClick}
                  />
                  <button className="clear-btn" onClick={handleClear}>×</button>
               </div>
               <h3>{user.login}</h3>
               <p>{user.name}</p>
               <p>{user.company}</p>
               <p>{user.location}</p>
               <p>Followers: {user.followers}</p>
               <p>Following: {user.following}</p>
               <p>Repositories: {user.public_repos}</p>
            </div>
         ) : (
            <div>
               <button onClick={handleButtonClick}>Select Profile</button>
               {inputVisible && (
                  <div className="popup">
                     <div className="popup-inner">
                        <button className="close-btn" onClick={handleClose}>×</button>
                        <input
                           type="text"
                           value={url}
                           onChange={handleInputChange}
                           placeholder="Enter GitHub profile URL"
                        />
                        <button onClick={handleSubmit}>Submit</button>
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default ProfileCard;
