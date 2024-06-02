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
  stars: number;
  language: string;
  bio?: string; // Свойства могут быть необязательными
  twitter_username?: string;
  blog?: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
  };
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  open_issues_count: number;
  license: string | null;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  languages_url: string;
}

export interface Contributor {
  login: string;
  id: number;
  contributions: number;
}

export interface ComparisonResult {
  winner: string | null;
  loser: string | null;
  stars1: number;
  stars2: number;
}
