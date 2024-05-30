import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails, fetchUserRepos } from '../../services/githubApi'; // Импортируем функции для получения данных о пользователе, репозиториях и языках программирования
import { User, Repository } from '../../types';
import styles from './UserProfile.module.scss';

const UserProfile: React.FC = () => {
   const { userId } = useParams<{ userId: string }>();
   const [userDetails, setUserDetails] = useState<User | null>(null);
   const [repos, setRepos] = useState<Repository[]>([]);

   useEffect(() => {
      const fetchUser = async () => {
         if (userId) {
            const userDetails = await fetchUserDetails(userId);
            setUserDetails(userDetails);
         }
      };

      const fetchRepos = async () => {
         if (userId) {
            const userRepos = await fetchUserRepos(userId);
            setRepos(userRepos);
         }
      };

      fetchUser();
      fetchRepos();
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

         <h3>Repositories</h3>
         <ul>
            {repos.map(repo => (
               <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                  <p>{repo.description}</p>
                  <p>Stars: {repo.stargazers_count}</p>
                  <p>Forks: {repo.forks_count}</p>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default UserProfile;
