import moment from "moment";
import { FC, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import Btn from "./Btn";
import { downloadData } from "../../lib/Download_Data";
import catchErr from "../../lib/CatchErr";
import HttpInterceptor from "../../lib/HttpInterceptor";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface PostInterface {
  postId?: string;
  children: string;
  name: string;
  dp: string;
  post_media: string;
  created: string;
  icon?: "delete";
}
const Post: FC<PostInterface> = ({postId, children, name, dp, post_media, created, icon}) =>
{
  const [mediaUrl, setMediaUrl] = useState('')

  const download_Media = async () =>{
    if(post_media)
    {
      const url =  await downloadData(post_media)
      setMediaUrl (url)
    }
  }

  useEffect(()=> {
    download_Media()
  },[post_media])
  
  const deletePost = async (postId: string, path: string|null) =>{
    try {
      const{data} = await HttpInterceptor.delete(`/post/delete/${postId}`)
  
      if(path)
      {
        const payload = {path}
        await HttpInterceptor.post("/storage/delete", payload);
      }

    toast.success(data.message)
    mutate('/post/myPost')
    } 
    catch (error: unknown) {
      catchErr(error)
    }
  }
  
  // 5 years on a journey for eternity. How blessed Iam to find you , I love you with all my heart ❤️♾️❤️♾️❤️
// As I step away from this format, it’s not easy — but it feels right. I’ve given it everything I had, and it’s given me back so much more than I could’ve hoped for. I’m walking away with a heart full of gratitude — for the game, for the people I shared the field with, and for every single person who made me feel seen along the way. I’ll always look back at my Test career with a smile. #269, signing off. 🇮🇳❤️
  const [liked, setLiked] = useState(false);
  const time = moment(created).fromNow();
  // const date=moment(created).format("Do MMM YY, hh:mm a");
  const likeValue = 55;
  const handleLike = () => {
    setLiked((prev) => !prev);
  };
  const likeStatus = liked ? "Liked" : "Like";
  const LikeBtnStyle = liked ? "primary" : "light";
  const LikeIcon = liked ? "thumb-up-fill" : "thumb-up-line";
  const LikeCount = liked ? `You and ${likeValue} others` : `${likeValue}`;
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl  shadow-md p-5 mb-8">
        <div className="flex items-center gap-3 mb-2 relative">
          <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
            <img src={dp} alt="Avatar" className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <p className="capitalize font-semibold text-gray-800 dark:text-white">
              {name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
          </div>
          <button onClick={() => deletePost(postId!, post_media)} className="absolute top-1 right-2 text-2xl text-gray-400 hover:text-gray-600 hover:dark:text-gray-200 transition-all cursor-pointer ">
            {icon === "delete" && (<MdDeleteOutline />)}
          </button>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
            {children}
          </p>
          {mediaUrl &&
            (post_media?.endsWith(".mp4") ||
            post_media?.endsWith(".webm") ||
            post_media?.endsWith(".ogg") ? (
              <video
                src={mediaUrl}
                controls
                className="w-full rounded-lg my-3  max-h-[400px] object-cover"
              />
            ) : (
              <img
                src={mediaUrl}
                alt="Post media"
                className="w-full rounded-lg my-3  max-h-[700px] object-cover"
              />
            ))}
        </div>

        <div className="flex flex-col border-t pt-2 mt-2 border-t-gray-200 gap-2">
          <div className="flex justify-end gap-2">
            <div className="flex gap-1">
              <div className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500   text-white w-6 h-6 rounded-full  flex justify-center items-center">
                <AiFillLike />{" "}
              </div>
              <div className="text-gray-600 dark:text-white">{LikeCount}</div>
            </div>
            <div className="flex gap-1">
              <div className=" text-gray-500 w-6 h-6 rounded-full  flex justify-center items-center">
                <FaComment />{" "}
              </div>
              <div className="text-gray-600 dark:text-white">25K</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Btn type={LikeBtnStyle} icon={LikeIcon} onclick={handleLike}>
              {likeStatus}
            </Btn>
            <Btn type="secondary" icon="chat-3-line">
              Comment
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
