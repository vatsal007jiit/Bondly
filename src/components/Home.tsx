import React from "react";
import avatar from "../Images/avatar.webp";
import Btn from "./shared/Btn";
import OnlineCard from "./shared/OnlineCard";
import SideMenu from "./shared/SideMenu";
import Post from "./shared/Post";
import useSWR from "swr";
import Fetcher from "../lib/Fetcher";
import {Skeleton} from "antd"

const Home: React.FC = () => {
  const {data , error, isLoading} =useSWR('/friend/fetch',Fetcher)

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans flex">
    {/* Left Sidebar */}
    <SideMenu/>

    {/* Main Feed */}
    <main className="ml-[18%] mr-[22%] mb-8 flex-1 p-6">
      {/* Create Post */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 mb-8">
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
      {[...Array(15)].map((_,index) => (
        <Post key={index} name={"Rahul"} pic={avatar} created={"2025-05-05T07:36:53.299+00:00"} icon="close">Hello Byeeeeee</Post>
      ))}
    </main>

    {/* Right Panel */}
    <aside className="fixed top-19 right-0 h-screen overflow-y-auto scrollbar-fade w-[22%] md:flex flex-col gap-6 p-6 bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-md border-l border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl my-4 font-bold bg-gradient-to-r from-blue-800 to-pink-500 bg-clip-text text-transparent dark:text-indigo-400 border-b-1 border-indigo-200">Contacts</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-200 text-sm">
              {isLoading && <Skeleton active/>}
              {data?.friends && (data?.friends).map((fd: any, index: number) => (
                <OnlineCard key={fd._id} name={fd.fullName} avatar={fd.image} gender={fd.gender} status={index%2==0 ? "online" : "offline"}/>
              ))}
            </ul>
          </div>
    </aside>
  </div>
);
};

export default Home;
