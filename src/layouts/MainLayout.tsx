// MainLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import UserList from '../components/UserList/UserList';
import { fetchUsers } from '../services/githubApi';
import { User } from '../types';

const MainLayout: React.FC = () => {
   const [users, setUsers] = useState<User[]>([]);
   const [filters, setFilters] = useState({ language: '', country: '', city: '' });

   const handleFilterChange = async (filterType: string, value: string) => {
      setFilters({ ...filters, [filterType]: value });
   };

   useEffect(() => {
      const fetchFilteredUsers = async () => {
         let query = 'type:user';
         if (filters.language) {
            query += ` language:${filters.language}`;
         }
         if (filters.country) {
            query += ` location:${filters.country}`;
         }
         if (filters.city) {
            query += ` location:${filters.city}`;
         }
         const users = await fetchUsers(query);
         setUsers(users);
      };

      fetchFilteredUsers();
   }, [filters]);

   return (
      <div className="wrapper">
         <Header />
         <FilterPanel onFilterChange={handleFilterChange} />
         <UserList users={users} />
         <Outlet />
      </div>
   );
};

export default MainLayout;