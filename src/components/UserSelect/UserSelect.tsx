import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../services/githubApi';
import { User } from '../../types';

interface UserSelectProps {
   onUserSelect: (user: User) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ onUserSelect }) => {
   const [users, setUsers] = useState<User[]>([]);
   const [query, setQuery] = useState('');

   useEffect(() => {
      const fetchUserList = async () => {
         const result = await fetchUsers(query, 'followers', 1);
         setUsers(result);
      };

      if (query.length > 2) {
         fetchUserList();
      }
   }, [query]);

   return (
      <div>
         <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for users..."
         />
         <ul>
            {users.map(user => (
               <li key={user.id} onClick={() => onUserSelect(user)}>
                  {user.login}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default UserSelect;
