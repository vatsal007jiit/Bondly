import React from 'react'
import avatar from "../../Images/avatar.webp"
import { MdOutlineChat } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FcVideoCall } from "react-icons/fc";
import { Link } from 'react-router-dom';

interface OnlineInterface {
  name: string,
  status: "online" | "offline"
}

const OnlineCard: React.FC<OnlineInterface> = ({ name, status }) => {
  return (
    <div className='flex justify-between items-center my-6 bg-blue-300 dark:bg-gray-700 rounded-lg p-2'>
      {/* Left section */}
      <div className='flex gap-2 items-center'>
        <div className="relative">
          <img src={avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-700 ${
              status === "online" ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
        </div>
        <div>
          <h1 className='capitalize text-md font-semibold'>{name}</h1>
          <p className='text-xs text-gray-800 dark:text-gray-300'>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
      </div>

      {/* Right icons */}
      <div className='flex gap-2 text-xl'>
        <button className='text-blue-600 hover:text-blue-700 hover:scale-105 transition-all cursor-pointer'><MdOutlineChat /></button>
        <button className='text-red-400 hover:text-red-600 hover:scale-105 transition-all cursor-pointer'><Link to='/audio'><IoCallOutline /></Link></button>
        <button className='hover:scale-110 transition-all cursor-pointer'><Link to='/video'><FcVideoCall /></Link></button>
      </div>
    </div>
  );
};

export default OnlineCard;

// import React from 'react'
// import avatar from "../../Images/avatar.webp"
// import { MdOutlineChat, MdOutlineVideoCall } from "react-icons/md";
// import { IoCallOutline } from "react-icons/io5";
// import { FcVideoCall } from "react-icons/fc";
// interface OnlineInterface{
//     name: String,
//     status: "online" | "offline"
// }

// const OnlineCard: React.FC<OnlineInterface> = ({name, status}) => {
//   return (
//     <>
//       <div className='flex justify-between my-6 bg-blue-300 dark:bg-gray-700 rounded-lg p-2'>
//         <div className='flex gap-1'>
//             <img src={avatar} alt="Avatar" className="h-10 w-10 rounded-full" />
//             <div>
//                 <h1 className='capitalize text-md font-semibold'>{name}</h1>
//                 {
//                 status==='online' ? 
//                 <p className='text-xs'> 🟢Online</p> :
//                 <p className='text-xs'> 🔴Offline</p>
//                 }
//             </div>
//         </div>
//       <div className='flex gap-1 text-xl'>
//         <button className='text-blue-600 hover:text-blue-700 hover:scale-105 transition-all cursor-pointer'><MdOutlineChat /></button>
//         <button className='text-red-400 hover:text-red-600 hover:scale-105 transition-all cursor-pointer'><IoCallOutline /></button>
//         <button className='hover:scale-110 transition-all cursor-pointer'><FcVideoCall /></button>
//       </div>
//       </div>
//     </>
//   )
// }

// export default OnlineCard
