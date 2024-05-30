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
 