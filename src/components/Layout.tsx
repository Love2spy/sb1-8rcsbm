import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-800">GovBid Manager Pro</h1>
        </div>
      </header>
      <div className="flex w-full pt-14">
        {children}
      </div>
    </div>
  );
};

export default Layout;