import React, { useState, useEffect } from 'react';
import { fetchRepositoryDetailsByUrl, fetchRepositoryContributors } from '../../services/githubApi'; // Импортируем функции для получения данных о репозитории
import { Repository } from '../../types';
import styles from './RepositoryDetails.module.scss';

const RepositoryDetails: React.FC = () => {
   const [repoUrl, setRepoUrl] = useState('');
   const [repository, setRepository] = useState<Repository | null>(null);
   const [contributors, setContributors] = useState<string[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!repoUrl) {
         setError('Please enter a repository URL');
         return;
      }

      setLoading(true);
      setError('');

      try {
         const repoDetails = await fetchRepositoryDetailsByUrl(repoUrl);
         setRepository(repoDetails);

         // Получаем список контрибьюторов
         if (repoDetails) {
            const contributorsData = await fetchRepositoryContributors(repoDetails.id);
            setContributors(contributorsData.map((contributor: any) => contributor.login));
         }
      } catch (error) {
         setError('Error fetching repository details');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className={styles.repositoryDetails}>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               value={repoUrl}
               onChange={(e) => setRepoUrl(e.target.value)}
               placeholder="Enter repository URL"
            />
            <button type="submit">Fetch Details</button>
         </form>

         {loading && <div>Loading...</div>}
         {error && <div>{error}</div>}

         {repository && (
            <>
               <div className={styles.repoInfo}>
                  <h2>{repository.name}</h2>
                  <p>Description: {repository.description}</p>
                  <p>Stars: {repository.stargazers_count}</p>
                  <p>Forks: {repository.forks_count}</p>
                  <p>Created at: {new Date(repository.created_at).toLocaleDateString()}</p>
               </div>
               <div className={styles.contributors}>
                  <h3>Contributors:</h3>
                  <ul>
                     {contributors.map(contributor => (
                        <li key={contributor}>{contributor}</li>
                     ))}
                  </ul>
               </div>
            </>
         )}
      </div>
   );
};

export default RepositoryDetails;
