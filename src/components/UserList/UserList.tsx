import React from 'react';
import ProfileCard from '../ProfileCard/ProfileCard';
import styles from './UserList.module.scss';
import { User } from '../../types';

interface UserListProps {
   users: User[];
   onPageChange: (page: number) => void;
   currentPage: number;
}

const UserList: React.FC<UserListProps> = ({ users, onPageChange, currentPage }) => {
   const handlePageChange = (page: number) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onPageChange(page);
   };

   return (
      <div className={styles.userListContainer}>
         <div className={styles.userList}>
            {users.map(user => (
               <ProfileCard
                  key={user.id}
                  user={user}
                  onUserSelect={() => { }}
                  onClear={() => { }}
                  url={user.html_url}
               />
            ))}
         </div>
         <div className={styles.paginationContainer}>
            <button
               className={styles.paginationButton}
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
            >
               {'<'}
            </button>
            <span className={styles.pageNumber}>Page {currentPage}</span>
            <button
               className={styles.paginationButton}
               onClick={() => handlePageChange(currentPage + 1)}
            >
               {'>'}
            </button>
         </div>
      </div>
   );
};

export default UserList;
