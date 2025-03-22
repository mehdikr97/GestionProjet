import React from 'react';

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-sky/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="/">
              <p className="sr-only">Website Title</p>
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <a
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-white transition-all duration-200 hover:bg-yellow-100 hover:text-white-100"
              href="#"
            >
              Acceuil
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              About
            </a>
        
           
          </div>
          <div className="flex items-center justify-end gap-3">
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;