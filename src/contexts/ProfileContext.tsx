import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface ProfileContextProps {
   user1: User | null;
   user2: User | null;
   url1: string;
   url2: string;
   setUser1: (user: User | null) => void;
   setUser2: (user: User | null) => void;
   setUrl1: (url: string) => void;
   setUrl2: (url: string) => void;
}

const ProfileContext = createContext<ProfileContextProps>({
   user1: null,
   user2: null,
   url1: '',
   url2: '',
   setUser1: () => { },
   setUser2: () => { },
   setUrl1: () => { },
   setUrl2: () => { },
});

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [user1, setUser1] = useState<User | null>(null);
   const [user2, setUser2] = useState<User | null>(null);
   const [url1, setUrl1] = useState('');
   const [url2, setUrl2] = useState('');

   return (
      <ProfileContext.Provider value={{ user1, user2, url1, url2, setUser1, setUser2, setUrl1, setUrl2 }}>
         {children}
      </ProfileContext.Provider>
   );
};

export default ProfileContext;
