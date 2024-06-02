import { ComparisonResult, User } from '../types';
import { fetchUserDetails } from '../services/githubApi';

export const handleUserSelect = async (
   url: string,
   setUser: React.Dispatch<React.SetStateAction<User | null>>,
   setUrl: React.Dispatch<React.SetStateAction<string>>,
   setShowResults: React.Dispatch<React.SetStateAction<boolean>>,
   setComparisonResult: React.Dispatch<React.SetStateAction<ComparisonResult>>
) => {
   const username = url.split('/').pop();
   if (username) {
      const userDetails = await fetchUserDetails(username);
      setUser(userDetails);
      setUrl(url);
      setShowResults(false);
      setComparisonResult({ winner: null, loser: null, stars1: 0, stars2: 0 });
   }
};

export const handleClearUser = (
   setUser: React.Dispatch<React.SetStateAction<User | null>>,
   setUrl: React.Dispatch<React.SetStateAction<string>>,
   setShowResults: React.Dispatch<React.SetStateAction<boolean>>,
   setComparisonResult: React.Dispatch<React.SetStateAction<ComparisonResult>>
) => {
   setUser(null);
   setUrl('');
   setShowResults(false);
   setComparisonResult({ winner: null, loser: null, stars1: 0, stars2: 0 });
};
