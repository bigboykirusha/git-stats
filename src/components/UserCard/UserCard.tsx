import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.scss';
import { User } from '../../types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <Link to={`/profile/${user.login}`}>
        <img src={user.avatar_url} alt={user.login} />
        <h3>{user.login}</h3>
      </Link>
    </div>
  );
};

export default UserCard;
