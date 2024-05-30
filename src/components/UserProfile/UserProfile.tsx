import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetails, fetchUserRepos } from '../../services/githubApi';
import { User, Repository } from '../../types';
import styles from './UserProfile.module.scss';

const UserProfile: React.FC = () => {
   const { userId } = useParams<{ userId: string }>();
   const [userDetails, setUserDetails] = useState<User | null>(null);
   const [popularRepos, setPopularRepos] = useState<Repository[]>([]);
   const [newestRepos, setNewestRepos] = useState<Repository[]>([]);

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
            const sortedByStars = [...userRepos]
               .sort((a, b) => b.stargazers_count - a.stargazers_count)
               .slice(0, 10);
            const sortedByDate = [...userRepos]
               .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
               .slice(0, 10);

            setPopularRepos(sortedByStars);
            setNewestRepos(sortedByDate);
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

         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
               <h3>Most Popular Repositories</h3>
               <ul>
                  {popularRepos.map(repo => (
                     <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                        <p>{repo.description}</p>
                        <p>Stars: {repo.stargazers_count}</p>
                        <p>Forks: {repo.forks_count}</p>
                     </li>
                  ))}
               </ul>
            </div>
            <div>
               <h3>Newest Repositories</h3>
               <ul>
                  {newestRepos.map(repo => (
                     <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                        <p>{repo.description}</p>
                        <p>Created at: {new Date(repo.created_at).toLocaleDateString()}</p>
                        <p>Stars: {repo.stargazers_count}</p>
                        <p>Forks: {repo.forks_count}</p>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
