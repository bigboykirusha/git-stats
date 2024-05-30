// UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails } from '../../services/githubApi';
import { User } from '../../types';
import styles from './UserProfile.module.scss';

const UserProfile: React.FC = () => {
   const { userId } = useParams<{ userId: string }>();
   const [userDetails, setUserDetails] = useState<User | null>(null);

   useEffect(() => {
      const fetchUser = async () => {
         if (userId) {
            const userDetails = await fetchUserDetails(userId);
            setUserDetails(userDetails);
         }
      };

      fetchUser();
   }, [userId]);

   if (!userDetails) {
      return <div>Loading...</div>;
   }

   return (
      <div className={styles.userProfile}>
         <img src={userDetails.avatar_url} alt={userDetails.login} />
         <h2>{userDetails.login}</h2>
         <p>Name: {userDetails.name}</p>
         <p>Company: {userDetails.company}</p>
         <p>Location: {userDetails.location}</p>
         <p>Followers: {userDetails.followers}</p>
         <p>Following: {userDetails.following}</p>
         <p>Public Repositories: {userDetails.public_repos}</p>
         <p>Profile URL: <a href={userDetails.html_url} target="_blank" rel="noopener noreferrer">{userDetails.html_url}</a></p>
      </div>
   );
};

export default UserProfile;
