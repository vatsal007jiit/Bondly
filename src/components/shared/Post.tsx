import moment from 'moment';
import { FC } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import Btn from './Btn';

interface PostInterface{
    children: string;
    name: string;
    pic: string;
    created: string;
    icon?:"close" |"delete"
}
const Post:FC<PostInterface> = ({children, name, pic, created, icon}) => {

    const time =moment(created).fromNow();
    // const date=moment(created).format("Do MMM YY, hh:mm a");

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 mb-8">
          <div className="flex items-center gap-3 mb-2 relative">
            <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
              <img src={pic} alt="Avatar" className="h-10 w-10 rounded-full" />
            </div>
            <div >
              <p className="font-semibold text-gray-800 dark:text-white">{name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
            </div>
            <button className="absolute top-1 right-2 text-2xl text-gray-400 hover:text-gray-600 hover:dark:text-gray-200 transition-all cursor-pointer ">{icon==='close'?<IoIosCloseCircleOutline />:<MdDeleteOutline />}
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
            This is a sample post from user.{children} Let's build bonds and bridge meaningful relationships here on Bondly!
          </p>
          <div className='flex flex-col border-t pt-2 mt-2 border-t-gray-200 gap-2'>
            <div className='flex justify-end gap-2'>
              <div className='flex gap-1'>
                <div className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500   text-white w-6 h-6 rounded-full  flex justify-center items-center"><AiFillLike /> </div>
                <div className='text-gray-600 dark:text-white'>45K</div>
              </div>
              <div className='flex gap-1'>
                <div className=" text-gray-500 w-6 h-6 rounded-full  flex justify-center items-center"><FaComment /> </div>
                <div className='text-gray-600 dark:text-white'>25K</div>
              </div>
            </div>
            
            <div className='flex gap-2'>
                <Btn icon="thumb-up-line">Like</Btn>
                <Btn type='secondary' icon='chat-3-line'>Comment</Btn>
            </div>
          </div>
        </div>
    </>
  )
}

export default Post
