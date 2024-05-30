import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserList.module.scss';
import { User } from '../../types';

interface UserListProps {
   users: User[];
   onPageChange: (page: number) => void;
   currentPage: number;
}

const UserList: React.FC<UserListProps> = ({ users, onPageChange, currentPage }) => {
   return (
      <div>
         <div className={styles.userList}>
            {users.map(user => (
               <Link key={user.id} to={`/profile/${user.login}`} className={styles.userCard}>
                  <img src={user.avatar_url} alt={user.login} />
                  <h3>{user.login}</h3>
               </Link>
            ))}
         </div>
         <div className={styles.pagination}>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
               Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={() => onPageChange(currentPage + 1)}>
               Next
            </button>
         </div>
      </div>
   );
};

export default UserList;
