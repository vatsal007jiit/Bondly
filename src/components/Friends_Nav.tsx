import { NavLink, Outlet } from "react-router-dom";

const Friends: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans flex">
      {/* Left Sidebar */}
      <aside className="fixed top-22 left-0 h-[calc(100vh-4rem)] w-1/5 overflow-y-auto scrollbar-hidden font-semibold hidden lg:flex flex-col gap-6 p-6 bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-lg border-r border-gray-400 dark:border-gray-700">
        <nav className="text-lg space-y-4">
          
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `block p-1 rounded-lg transition cursor-pointer ${
                isActive
                  ? "bg-white text-indigo-600 dark:bg-gray-700"
                  : "hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/friend/friendList"
            className={({ isActive }) =>
              `block p-1 rounded-lg transition cursor-pointer ${
                isActive
                  ? "bg-white text-indigo-600 dark:bg-gray-700"
                  : "hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            👥 All Friends
          </NavLink>

          <NavLink
            to="/friend/friendRequest"
            className={({ isActive }) =>
              `block p-1 rounded-lg transition cursor-pointer ${
                isActive
                  ? "bg-white text-indigo-600 dark:bg-gray-700"
                  : "hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            👤 Friend Request
          </NavLink>

          <NavLink
            to="/friend/sendRequest"
            className={({ isActive }) =>
              `block p-1 rounded-lg transition cursor-pointer ${
                isActive
                  ? "bg-white text-indigo-600 dark:bg-gray-700"
                  : "hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            💬 Suggestions
          </NavLink>
          <NavLink
            to="/friend/sent"
            className={({ isActive }) =>
              `block p-1 rounded-lg transition cursor-pointer ${
                isActive
                  ? "bg-white text-indigo-600 dark:bg-gray-700"
                  : "hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            ⏳ Sent Requests
          </NavLink>
          <NavLink
            to="/friend/bday"
            className={({ isActive }) =>
              `block p-1 rounded-lg transition cursor-pointer ${
                isActive
                  ? "bg-white text-indigo-600 dark:bg-gray-700"
                  : "hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            🎂 Birthdays
          </NavLink>
        </nav>
      </aside>

      {/* Main Feed */}
      <main className="lg:ml-[20%] flex-1 p-6 mx-auto space-y-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Friends;

// import { Link } from "react-router-dom";
// import { Outlet } from 'react-router-dom'
// const Friends: React.FC = () => {
  

//   return (
//     <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans flex">
//     {/* Left Sidebar */}
//   <aside className=" fixed top-22 left-0 h-[calc(100vh-4rem)] w-1/5 overflow-y-auto scrollbar-hidden font-semibold hidden lg:flex flex-col gap-6 p-6 bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-lg border-r border-gray-400 dark:border-gray-700">
//     <nav className="text-lg space-y-4">
      
//       <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><NavLink to='/friend/friendList'>👥 All Friends</NavLink></div>
//       <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><NavLink to='/friend/friendRequest'>👤 Friend Request</NavLink></div>
//       <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><NavLink to='/friend/sendRequest'>💬 Suggestions</NavLink></div>
//       {/* <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 rounded-lg"><Link to='/Birthdays'>🎂 Birthdays/</Link><div> */}
     
//     </nav>
//   </aside> 

//     {/* Main Feed */}
//     <main className="lg:ml-[20%] flex-1 p-6 mx-auto space-y-6">
//      <Outlet/>
//     </main>
//   </div>
// )
// };

// export default Friends;