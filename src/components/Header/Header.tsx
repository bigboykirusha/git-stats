// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
   return (
      <header>
         <nav>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/compare-profiles">Compare Profiles</Link>
               </li>
               <li>
                  <Link to="/similar-profiles">Similar Profiles</Link>
               </li>
            </ul>
         </nav>
      </header>
   );
};

export default Header;
