import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-800 to-gray-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
        ConstructionXpert Services Solution
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white hover:text-gray-200">Accueil</a>
          </li>
          <li>
            <a href="/about" className="text-white hover:text-gray-200">À propos</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;