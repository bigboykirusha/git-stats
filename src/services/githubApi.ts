import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const axiosInstance = axios.create({
   baseURL: GITHUB_API_BASE_URL,
   headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
   },
});

export const fetchUsers = async (query: string, sort: string, page: number) => {
   try {
      const response = await axiosInstance.get('/search/users', {
         params: { q: query, sort: sort, order: 'desc', per_page: 30, page: page },
      });
      return response.data.items.map((item: any) => ({
         id: item.id,
         login: item.login,
         avatar_url: item.avatar_url,
         repositories: item.public_repos,
         followers: item.followers,
      }));
   } catch (error) {
      console.error('Error fetching users from GitHub API:', error);
      return [];
   }
};

export const fetchUserDetails = async (username: string) => {
   try {
      const response = await axiosInstance.get(`/users/${username}`);
      return response.data; // возвращает все данные о пользователе
   } catch (error) {
      console.error('Error fetching user details from GitHub API:', error);
      return null;
   }
};

export const fetchUserRepos = async (username: string) => {
   try {
      const response = await axiosInstance.get(`/users/${username}/repos`);
      return response.data;
   } catch (error) {
      console.error('Error fetching user repositories from GitHub API:', error);
      return [];
   }
};

export const fetchRepositoryContributors = async (repoId: string) => {
   try {
      const response = await axiosInstance.get(`/repositories/${repoId}/contributors`);
      return response.data;
   } catch (error) {
      console.error('Error fetching repository contributors from GitHub API:', error);
      return [];
   }
};
