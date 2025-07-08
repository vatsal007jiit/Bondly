import React, { useContext } from "react";
import { FiHome, FiLogOut, FiSearch, FiUser,FiMoon, FiSun } from "react-icons/fi";
import logo from "../Images/Logo-B2.jpg";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import Fetcher from "../lib/Fetcher";
import UserContext from "./UserContext";
import logout from "./Auth/Logout";

type HeaderProps = {
    toggleDark: () => void;
  };
  
  const Header: React.FC<HeaderProps> = ({ toggleDark }) => {

    const navigate =useNavigate()
    const { setSession } = useContext(UserContext);

    useSWR('/auth/refresh-Token', Fetcher, {
      refreshInterval: 8 * 60 * 1000, // 8 min in ms [Access token expiry = 10 min]
      shouldRetryOnError: false
    })




    return (
      <header className="sticky top-0 z-50 bg-gray-50 dark:bg-gray-800 dark:text-white shadow-lg flex items-center justify-between px-6 py-3 font-sans">
      {/* Left: Logo and Tagline */}
      <div className="flex items-center gap-1">
      <img src={logo} alt="CircleSync Logo" className="h-16 w-16 mb-2 rounded-full"/>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-pink-500 bg-clip-text text-transparent dark:text-indigo-400">Bondly</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Building Bonds, Bridging Relations</p>
      </div>
      </div>
      {/* Center: Search */}
      {/* <div className="relative w-1/3 hidden md:block">
        <input
          type="text"
          placeholder="Search Bondly"
          className="w-full pl-10 pr-4 py-2 border bg-gray-200 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-300" />
      </div> */}

      {/* Right: Icons */}
      <div className="flex items-center gap-5 text-xl text-gray-600 dark:text-gray-300">
        <Link to='/home'><FiHome className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" title="Home" /></Link>
        {/* <FiMessageSquare className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" title="Messages" /> */}
        <Link to='/profile'><FiUser className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" title="Profile" /></Link>
        <button onClick={()=>logout(navigate, setSession)}><FiLogOut className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer" title="Logout" /></button>
        <button onClick={toggleDark} title="Toggle Theme">
          <FiSun className="hidden dark:inline-block hover:text-yellow-400" />
          <FiMoon className="inline-block dark:hidden hover:text-indigo-600" />
        </button>
      </div>
    </header>
    );
  };
  
  export default Header;
