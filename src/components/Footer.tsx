import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" w-full border-t shadow-2xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-6 text-sm text-center text-gray-600 dark:text-gray-400">
      <div className="z-100 max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div>
          © {new Date().getFullYear()} <span className="font-semibold text-indigo-600 dark:text-indigo-400">Bondly</span>. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
