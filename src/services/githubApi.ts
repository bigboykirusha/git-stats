import axios from 'axios';
import { Repository, User } from '../types';
import dayjs from 'dayjs';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const axiosInstance = axios.create({
   baseURL: GITHUB_API_BASE_URL,
   headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
   },
});

export const fetchUserDetails = async (username: string) => {
   try {
      const response = await axiosInstance.get(`/users/${username}`);
      return response.data;
   } catch (error) {
      console.error('Ошибка при получении информации о пользователе с GitHub API:', error);
      return null;
   }
};

export const fetchAdditionalUserData = async (username: string): Promise<Partial<User>> => {
   try {
      const response = await axiosInstance.get(`/users/${username}`);
      const { twitter_username, blog } = response.data;
      return {
         twitter_username,
         blog,
      };
   } catch (error) {
      console.error('Ошибка при получении дополнительной информации о пользователе с GitHub API:', error);
      return {};
   }
};

export const fetchUsers = async (query: string, sort: string, page: number) => {
   try {
      const response = await axiosInstance.get('/search/users', {
         params: { q: query, sort: sort, order: 'desc', per_page: 10, page: page },
      });

      const users = await Promise.all(response.data.items.map(async (item: any) => {
         const userDetails = await fetchUserDetails(item.login);

         return {
            id: item.id,
            login: item.login,
            avatar_url: item.avatar_url,
            public_repos: userDetails.public_repos,
            followers: userDetails.followers,
            bio: userDetails.bio,
            twitter_username: userDetails.twitter_username,
            blog: userDetails.blog,
            updated_at: item.updated_at,
         };
      }));

      return users; 
   } catch (error) {
      console.error('Ошибка при получении пользователей с GitHub API:', error);
      return [];
   }
};

export const fetchUsersSecond = async (query: string, sort: string, page: number) => {
   try {
      const response = await axiosInstance.get('/search/users', {
         params: { q: query, sort: sort, order: 'desc', per_page: 10, page: page },
      });

      const users = await Promise.all(response.data.items.map(async (item: any) => {
         const userDetails = await fetchUserDetails(item.login);
         return {
            id: item.id,
            login: item.login,
            avatar_url: item.avatar_url,
            repositories: item.public_repos,
            followers: item.followers,
            updated_at: item.updated_at,
            ...userDetails,
         };
      }));

      const ago = dayjs().subtract(6, 'month');

      return users
         .filter((user: any) => dayjs(user.updated_at).isAfter(ago));
   } catch (error) {
      console.error('Ошибка при получении пользователей с GitHub API:', error);
      return [];
   }
};

export const fetchUsersByLocation = async (
   location: string | null,
   language: string,
   minRepos: number,
   maxRepos: number,
   minFollowers: number,
   maxFollowers: number,
   page: number
): Promise<User[]> => {
   const queries = [];

   if (!location) {
      queries.push(fetchUsersSecond(`language:${language} repos:${minRepos}..${maxRepos} followers:${minFollowers}..${maxFollowers}`, 'asc', page));
   } else {
      const locationParts = location.split(',').map(part => part.trim());
      if (locationParts.length === 1) {
         const [part] = locationParts;
         queries.push(fetchUsersSecond(`location:${part} language:${language} repos:${minRepos}..${maxRepos} followers:${minFollowers}..${maxFollowers}`, 'asc', page));
      } else if (locationParts.length === 2) {
         const [city, country] = locationParts;
         queries.push(fetchUsersSecond(`location:${city},${country} language:${language} repos:${minRepos}..${maxRepos} followers:${minFollowers}..${maxFollowers}`, 'asc', page));
      }
   }

   const results = await Promise.all(queries);
   return results.flat();
};

export const extractUserInformation = async (user: User): Promise<{ location: string; repositories: Repository[]; languages: string[] }> => {
   try {
      console.log(`Fetching repositories for user: ${user.login}`);
      const repositories: Repository[] = await fetchUserRepositories(user.login);
      console.log(`Fetched repositories:`, repositories);

      const languageCount: { [key: string]: number } = {};
      repositories.forEach((repo: Repository) => {
         if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
         }
      });

      const mostUsedLanguage = Object.keys(languageCount).sort((a, b) => languageCount[b] - languageCount[a])[0];
      const languages = mostUsedLanguage ? [mostUsedLanguage] : [];
      user.language = languages[0];

      console.log(`Most used language:`, mostUsedLanguage);

      return {
         location: user.location,
         repositories,
         languages,
      };
   } catch (error) {
      console.error('Ошибка при получении информации о пользователе:', error);
      throw error;
   }
};

export const fetchRepositoryContributors = async (repoId: string) => {
   try {
      const response = await axiosInstance.get(`/repositories/${repoId}/contributors`);
      return response.data;
   } catch (error) {
      console.error('Ошибка при получении участников репозитория с GitHub API:', error);
      return [];
   }
};

export const fetchUserRepositories = async (username: string): Promise<Repository[]> => {
   try {
      const response = await axiosInstance.get(`/users/${username}/repos`);
      return response.data as Repository[];
   } catch (error) {
      console.error('Ошибка при получении репозиториев пользователя:', error);
      throw error;
   }
};
