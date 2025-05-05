import React from "react";
import avatar from "../Images/avatar.webp";
import { Link } from "react-router-dom";
import Btn from "./shared/Btn";
import OnlineCard from "./shared/OnlineCard";
import SideMenu from "./shared/SideMenu";

const Home: React.FC = () => {
  

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans flex">
    {/* Left Sidebar */}
    <SideMenu/>

    {/* Main Feed */}
    <main className="ml-[18%] mr-[22%] mb-8 flex-1 p-6 space-y-6">
      {/* Create Post */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5">
        <textarea
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        />
        <div className="text-right mt-3">
          <Btn>Post</Btn>
        </div>
      </div>

      {/* Sample Posts */}
      {[...Array(15)].map((post) => (
        <div key={post} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
              U{post}
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">User {post}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2h ago</p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This is a sample post from user {post}. Let's build bonds and bridge meaningful relationships here on Bondly!
          </p>
        </div>
      ))}
    </main>

    {/* Right Panel */}
    <aside className="fixed top-19 right-0 h-screen overflow-y-auto scrollbar-fade w-[22%] hidden xl:flex flex-col gap-6 p-6 bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-md border-l border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl my-4 font-bold bg-gradient-to-r from-blue-800 to-pink-500 bg-clip-text text-transparent dark:text-indigo-400 border-b-1 border-indigo-200">Contacts</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
              {[...Array(25)].map((_, index) => (
                <OnlineCard key={index} name='Rahul Dravid' status={index%2==0 ? "online" : "offline"}/>
              ))}
            </ul>
          </div>
    </aside>
  </div>
);
};

export default Home;
