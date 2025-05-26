import React, { useContext, useState } from "react";
import Btn from "./shared/Btn";
import SideMenu from "./shared/SideMenu";
import Post from "./shared/Post";
import useSWR from "swr";
import Fetcher from "../lib/Fetcher";
import { Skeleton, Spin } from "antd";
import dp from "../lib/DP";
import CreatePostModal from "./CreatePostModal";
import UserContext from "./UserContext";

import HttpInterceptor from "../lib/HttpInterceptor";
import { toast } from "react-toastify";
import uploadData from "../lib/Upload_Data";
import catchErr from "../lib/CatchErr";
import Empty from "./shared/Empty";
import Friend_Online from "./Friend_Online";

const Home: React.FC = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { session: user } = useContext(UserContext);
  const [postText, setPostText] = useState("");

  const handleNewPost = async (text: string, media?: File) => {
    try {
      setIsUploading(true)
     const path = `posts/${user.id}/${media?.name}`
     const payload = {
      text,
      media: (media!= null) ? path : null
     }
     if (media) {
         await uploadData(media, path); // Ensures upload is complete before continuing so using await
      }
     const {data} = await HttpInterceptor.post("/post/create", payload)
     toast.success(data.message)

     setPostText(""); 
    } 
    catch (error: unknown) {
      catchErr(error)
    }
    finally{
      setIsUploading(false)
    }
  };

  const { data: fdPosts, error, isLoading: loadingPosts } = useSWR("/post", Fetcher);

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans flex">
      {/* Left Sidebar */}
      <SideMenu />
      <CreatePostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPost={handleNewPost}
        user={{ name: "You", dp: user.image }}
      />

      {/* Main Feed */}
      <main className="ml-[18%] mr-[22%] mb-8 flex-1 p-6">
        {isUploading && <div className="mx-auto font-bold text-xl flex justify-center items-center gap-3 "> <Spin size="large" /> Uploading Post ...</div>}
        {/* Create Post */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 mb-8">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
          <div className="flex justify-between">
            <div className="mt-3">
              <Btn
                type="secondary"
                icon="multi-image-line"
                onclick={() => setModalOpen(true)}
              >
                Photo/video
              </Btn>
            </div>

            <div className="text-right mt-3">
              <Btn onclick={() => handleNewPost(postText)}>Post</Btn>
            </div>
          </div>
        </div>
          {/* Fetch Friends Posts */}

        {loadingPosts && (<Skeleton />)}
        {error && (<p className="text-center text-red-500">Failed to load posts</p> )}
         
        {fdPosts && fdPosts.posts.length === 0 && ( <Empty/> )}

        {fdPosts &&
          fdPosts.posts.map((post: any) => (
            <Post
              key={post._id}
              name= {post?.user?.fullName}
              dp={ dp(post?.user?.image, post.user?.gender) }
              post_media={post.media}
              created={post.createdAt}
            >
              {post.text}
            </Post>
          ))}
      </main>

      {/* Right Panel */}
      <aside className="fixed top-19 right-0 h-screen overflow-y-auto scrollbar-fade w-[22%] md:flex flex-col gap-6 p-6 bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-md border-l border-gray-200 dark:border-gray-700">
        <Friend_Online/>
      </aside>
    </div>
  );
};

export default Home;
