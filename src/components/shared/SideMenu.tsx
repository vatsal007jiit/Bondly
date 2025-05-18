import { useContext, useEffect, useState } from "react";
import avatar from "../../Images/avatar.webp";
import avatarFem from "../../Images/avatar-fem.png";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import logout from "../Logout";
import { downloadProfilePic } from "../../lib/Download_Dp";

const SideMenu = () => {
  const navigate = useNavigate();
  const { session: user, setSession } = useContext(UserContext);
  const [imagePreview, setImagePreview] = useState(
    user.gender === "Male" ? avatar : avatarFem
  );

  const donwload_dp = async () => {
    const url = await downloadProfilePic(user.image);
    setImagePreview(url);
  };

  useEffect(() => {
    if(user?.image)
      donwload_dp()
  }, []);

  return (
    <div>
      <aside className=" fixed top-22 left-0 h-[calc(100vh-4rem)] w-[18%] overflow-y-auto scrollbar-hidden font-semibold md:flex flex-col gap-6 p-6 bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-lg border-r border-gray-400 dark:border-gray-700">
        <nav className="text-lg space-y-4">
          <div className="flex items-center gap-1 mt-2 p-1  ">
            <img
              src={imagePreview}
              alt="Avatar"
              className="h-16 w-16 rounded-full"
            />
            <h1 className="capitalize">{user.fullName}</h1>
          </div>
          <Link to="/home">
            <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 mb-2 rounded-lg">
              🏠 Home
            </div>
          </Link>
          <Link to="/posts">
            <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 mb-2 rounded-lg">
              💬 My Posts
            </div>
          </Link>
          <Link to="/friend">
            <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 mb-2 rounded-lg">
              👥 Friends
            </div>
          </Link>
          <Link to="/profile">
            <div className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 mb-2 rounded-lg">
              👤 Profile
            </div>
          </Link>
          <div
            onClick={() => logout(navigate, setSession)}
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700 p-1 mb-2 rounded-lg"
          >
            🚪 Logout
          </div>
        </nav>

        {/* Footer */}
        <footer className="mt-auto text-center text-sm text-gray-600 dark:text-gray-300">
          <div className="space-x-4">
            <a
              href="#"
              className="hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              Help
            </a>
          </div>
          <p className="mt-2">© 2025 Bondly</p>
        </footer>
      </aside>
    </div>
  );
};

export default SideMenu;
