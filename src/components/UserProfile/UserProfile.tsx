import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserFriends, FaUserPlus, FaCodeBranch, FaLink, FaStar, FaUsers, FaBuilding } from 'react-icons/fa';
import { fetchUserDetails, fetchUserRepos, fetchRepositoryContributors } from '../../services/githubApi';
import { User, Repository } from '../../types';
import styles from './UserProfile.module.scss';

const UserProfile: React.FC = () => {
   const { userId } = useParams<{ userId: string }>();
   const [userDetails, setUserDetails] = useState<User | null>(null);
   const [popularRepos, setPopularRepos] = useState<Repository[]>([]);
   const [newestRepos, setNewestRepos] = useState<Repository[]>([]);
   const [expandedRepoId, setExpandedRepoId] = useState<number | null>(null);
   const [contributors, setContributors] = useState<{ [key: number]: string[] }>({});

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

   const toggleRepoDetails = async (repoId: number) => {
      if (expandedRepoId === repoId) {
         setExpandedRepoId(null);
         return;
      }

      setExpandedRepoId(repoId);
      if (!contributors[repoId]) {
         const repoContributors = await fetchRepositoryContributors(repoId.toString());
         setContributors(prev => ({ ...prev, [repoId]: repoContributors.map((contributor: any) => contributor.login) }));
      }
   };

   if (!userDetails) {
      return <div>Loading...</div>;
   }

   return (
      <div className={styles.userProfile}>
         <img src={userDetails.avatar_url} alt={userDetails.login} />
         <h2>{userDetails.login}</h2>
         <p><FaUserPlus className={styles.icon} /> {userDetails.name}</p>
         {userDetails.company && <p><FaBuilding className={styles.icon} /> {userDetails.company}</p>}
         <p><FaMapMarkerAlt className={styles.icon} /> {userDetails.location}</p>
         <p><FaUserFriends className={styles.icon} /> Followers: {userDetails.followers}</p>
         <p><FaUserFriends className={styles.icon} /> Following: {userDetails.following}</p>
         <p><FaCodeBranch className={styles.icon} /> Public Repositories: {userDetails.public_repos}</p>
         <p><FaLink className={styles.icon} /> <a href={userDetails.html_url} target="_blank" rel="noopener noreferrer">{userDetails.html_url}</a></p>

         <div className={styles.repoSection}>
            <div className={styles.repoList}>
               <h3>Most Popular Repositories</h3>
               <ul>
                  {popularRepos.map((repo) => (
                     <li key={repo.id} onClick={() => toggleRepoDetails(repo.id)}>
                        <div className={styles.repoHeader}>
                           <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                           <p><FaStar className={styles.icon} /> {repo.stargazers_count}</p>
                        </div>
                        {expandedRepoId === repo.id && (
                           <div className={styles.repoDetails}>
                              {repo.description && repo.description.trim() && <p>Description: {repo.description}</p>}
                              <p><FaCodeBranch className={styles.icon} /> Forks: {repo.forks_count}</p>
                              <p>Created at: {new Date(repo.created_at).toLocaleDateString()}</p>
                              <h4><FaUsers className={styles.icon} /> Contributors:</h4>
                              <ul>
                                 {contributors[repo.id]?.map(contributor => (
                                    <li key={contributor}>{contributor}</li>
                                 ))}
                              </ul>
                           </div>
                        )}
                     </li>
                  ))}
               </ul>
            </div>
            <div className={styles.repoList}>
               <h3>Newest Repositories</h3>
               <ul>
                  {newestRepos.map((repo) => (
                     <li key={repo.id} onClick={() => toggleRepoDetails(repo.id)}>
                        <div className={styles.repoHeader}>
                           <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                           <p><FaStar className={styles.icon} /> {repo.stargazers_count}</p>
                        </div>
                        {expandedRepoId === repo.id && (
                           <div className={styles.repoDetails}>
                              {repo.description && repo.description.trim() && <p>Description: {repo.description}</p>}
                              <p><FaCodeBranch className={styles.icon} /> Forks: {repo.forks_count}</p>
                              <p>Created at: {new Date(repo.created_at).toLocaleDateString()}</p>
                              <h4><FaUsers className={styles.icon} /> Contributors:</h4>
                              <ul>
                                 {contributors[repo.id]?.map(contributor => (
                                    <li key={contributor}>{contributor}</li>
                                 ))}
                              </ul>
                           </div>
                        )}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
