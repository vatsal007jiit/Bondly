import avatar from "../../Images/avatar.webp";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div>
      <aside className=" fixed top-22 left-0 h-[calc(100vh-4rem)] w-[18%] overflow-y-auto scrollbar-hidden font-semibold md:flex flex-col gap-6 p-6 bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-lg border-r border-gray-400 dark:border-gray-700">
      <nav className="text-lg space-y-4">
        <div className="flex items-center gap-1 mt-2 p-1  ">  
          <img src={avatar} alt="Avatar" className="h-8 w-8 rounded-full" />
          <h1 className="capitalize">Vatsal Gupta</h1> 
        </div>
        <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><Link to='/home'>🏠 Home</Link></div>
        <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><Link to='/posts'>💬 My Posts</Link></div>
        <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><Link to='/friend'>👥 Friends</Link></div>
        <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><Link to='/home'>👤 Profile</Link></div>
        <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><Link to='/'>🚪 Logout</Link></div>
      </nav>
      

      {/* Footer */}
      <footer className="mt-auto text-center text-sm text-gray-600 dark:text-gray-300">
        <div className="space-x-4">
          <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400">Privacy</a>
          <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400">Terms</a>
          <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400">Help</a>
        </div>
        <p className="mt-2">© 2025 Bondly</p>
      </footer>
    </aside>
    </div>
  )
}

export default SideMenu
