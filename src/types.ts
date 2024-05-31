export interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
}

export interface Contributor {
  login: string;
  id: number;
  contributions: number;
}
