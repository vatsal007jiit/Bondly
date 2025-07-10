import moment from "moment";
import { FC, useContext, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import Btn from "./Btn";
import { downloadData } from "../../lib/Download_Data";
import catchErr from "../../lib/CatchErr";
import HttpInterceptor from "../../lib/HttpInterceptor";
import { toast } from "react-toastify";
import useSWR , {mutate} from "swr";
import { Tooltip } from "antd";
import UserContext from "../UserContext";
import CommentModal from "./CommentModal";
import Fetcher from "../../lib/Fetcher";


interface PostInterface {
  postId: string;
  likes: { _id: string; fullName: string }[];
  children: string;
  name: string;
  dp: string;
  post_media: string;
  created: string;
  icon?: "delete";
  page?: number;
  limit?: number;
}
const Post: FC<PostInterface> = ({postId, likes, children, name, dp, post_media, created, icon, page, limit}) =>
{
  const { session: user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('')
  const likeStatus = liked ? "Liked" : "Like";
  const LikeBtnStyle = liked ? "primary" : "light";
  const LikeIcon = liked ? "thumb-up-fill" : "thumb-up-line";
  const time = moment(created).fromNow();
  const likeValue = likes.length
  const [showCmt, setShowCmt] = useState(false)
  const {data: comments} = useSWR(`/comment?post=${postId}`, Fetcher)


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
  
  const handleLike = async (id: string) => {
    try {
      const {data} = await HttpInterceptor.put(`/post/like/${id}`, {})
      setLiked((prev) => !prev);
      toast.success(data.message)
      // mutate(`/post?page=${page}&limit=${limit}`)
      // mutate('/post/myPost')
      await Promise.all([
      mutate(`/post?page=${page}&limit=${limit}`, undefined, { revalidate: true }),
      mutate('/post/myPost', undefined, { revalidate: true })
    ])
    } 
    catch (error) {
     catchErr(error)  
    }
    
  };

  useEffect(()=>{
    if (likes.some(like => like._id === user.id)) {
    setLiked(true);
    
  }
  }, [likes])

  const openCommentModal = ()=>{
    setShowCmt(true)
  }
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
          {
            icon === "delete" && 
            (
            <button onClick={() => deletePost(postId, post_media)} className="absolute top-1 right-2 text-2xl text-gray-400 hover:text-gray-600 hover:dark:text-gray-200 transition-all cursor-pointer ">
            <MdDeleteOutline />
            </button>
            )
          }
         
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
            <Tooltip title={likes.length > 0 ? likes.map((like, index) => ( <p className="capitalize" key={index}>{like.fullName}</p> ) ): "None"}>
              <div className="flex gap-1">
                <div className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500   text-white w-6 h-6 rounded-full  flex justify-center items-center">
                  <AiFillLike />{" "}
                </div>
                <div className="text-gray-600 dark:text-white">{likeValue}</div>
              </div>
            </Tooltip>
            <div className="flex gap-1">
              <div className=" text-gray-500 w-6 h-6 pr-1 rounded-full  flex justify-center items-center">
                <FaComment />{" "}
              </div>
              <div className="text-gray-600 dark:text-white">{comments?.length || 0}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Btn type={LikeBtnStyle} icon={LikeIcon} onclick={()=>handleLike(postId)}>
              {likeStatus}
            </Btn>
            <Btn type="secondary" onclick={openCommentModal} icon="chat-3-line">
              Comment
            </Btn>
          </div>
        </div>
      </div>
      {/* Comment Modal */}
      <CommentModal
        isOpen={showCmt}
        onClose={() => setShowCmt(false)}
        postId = {postId}
        user={{id: user.id, name: user.fullName, dp: user.image, gender:user.gender }}
        comments={comments}
      />
    </>
  );
};

export default Post;
