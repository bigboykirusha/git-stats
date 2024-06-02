import { ComparisonResult, User } from '../types';
import { fetchUserRepositories } from '../services/githubApi';

export const compareUsers = async (
   user1: User | null,
   user2: User | null,
   setComparisonResult: React.Dispatch<React.SetStateAction<ComparisonResult>>,
   setShowResults: React.Dispatch<React.SetStateAction<boolean>>
) => {
   if (user1 && user2) {
      const user1Repos = await fetchUserRepositories(user1.login);
      const user2Repos = await fetchUserRepositories(user2.login);

      const user1Stars = user1Repos.reduce((acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count, 0);
      const user2Stars = user2Repos.reduce((acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count, 0);

      let user1Points = 0;
      let user2Points = 0;

      if (user1.public_repos > user2.public_repos) user1Points++;
      else if (user1.public_repos < user2.public_repos) user2Points++;

      if (user1.followers > user2.followers) user1Points++;
      else if (user1.followers < user2.followers) user2Points++;

      if (user1Stars > user2Stars) user1Points++;
      else if (user1Stars < user2Stars) user2Points++;

      setComparisonResult({
         winner: user1Points > user2Points ? 'user1' : user2Points > user1Points ? 'user2' : null,
         loser: user1Points > user2Points ? 'user2' : user2Points > user1Points ? 'user1' : null,
         stars1: user1Stars,
         stars2: user2Stars,
      });

      setShowResults(true);
   }
};
