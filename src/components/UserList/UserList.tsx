// UserList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserList.module.scss';
import { User } from '../../types';

interface UserListProps {
   users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
   return (
      <div className={styles.userList}>
         {users.map(user => (
            <Link key={user.id} to={`/profile/${user.login}`} className={styles.userCard}>
               <img src={user.avatar_url} alt={user.login} />
               <h3>{user.login}</h3>
            </Link>
         ))}
      </div>
   );
};

export default UserList;
