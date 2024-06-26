import React, { useState, useEffect, useCallback } from 'react';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import UserList from '../../components/UserList/UserList';
import { fetchUsers } from '../../services/githubApi';
import { User } from '../../types';
import styles from "./Home.module.scss"

const Home: React.FC = () => {
   const [users, setUsers] = useState<User[]>([]);
   const [filters, setFilters] = useState({
      language: localStorage.getItem('language') || 'all',
      country: localStorage.getItem('country') || 'all',
      sort: 'followers',
      city: '',
   });
   const [page, setPage] = useState(1);

   const handleFilterChange = useCallback((filterType: string, value: string) => {
      setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
      localStorage.setItem(filterType, value);
      setPage(1);
   }, []);

   useEffect(() => {
      const fetchFilteredUsers = async () => {
         let query = 'type:user';
         if (filters.language !== 'all') {
            query += ` language:${filters.language}`;
         }
         if (filters.country !== 'all') {
            query += ` location:${filters.country}`;
         }
         if (filters.city) {
            query += ` location:${filters.city}`;
         }
         try {
            const users = await fetchUsers(query, filters.sort, page);
            setUsers(users);
         } catch (error) {
            console.error('Error fetching users:', error);
         }
      };

      fetchFilteredUsers();
   }, [filters, page]);

   return (
      <div className={styles.home}>
         <FilterPanel onFilterChange={handleFilterChange} filters={filters} />
         <UserList users={users} onPageChange={setPage} currentPage={page} />
      </div>
   );
};

export default Home;