// types.ts
export interface User {
   id: number;
   login: string;
   avatar_url: string;
   repositories: number;
   followers: number;
   name?: string;
   company?: string;
   location?: string;
   created_at?: string;
   following?: number;
   public_repos?: number;
   html_url?: string;
 }

export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}