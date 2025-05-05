import { useState } from "react";
import Model from "./shared/Model"
import { FaVideo , FaVideoSlash , FaMicrophoneAlt} from "react-icons/fa";
import { FaMicrophoneLinesSlash } from "react-icons/fa6";

import { MdCallEnd } from "react-icons/md";

const VideoCall = () => {

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  return (
    <>
      <Model title="Video Call">
        {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">

          <div className="bg-black dark:bg-gray-600 w-full h-0 relative rounded-xl pb-[56.25%]">
            <video  className="w-full h-full absolute inset-0"></video>
            <button className="px-2 py-1 rounded-lg absolute bottom-5 left-5 bg-white/25 text-white text-xs dark:bg-black/75">Rahul Dravid</button>
          </div>
        </div> */}
          {/* Remote Video */}
      <div className="relative w-full h-screen bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 flex flex-col items-center justify-center">
        <div className="w-full h-[70%] bg-black rounded-xl overflow-hidden mb-4 relative">
          <video className="w-full h-full object-cover" autoPlay playsInline muted />
          <div className="px-2 py-1 rounded-lg absolute bottom-5 left-5 bg-white/25 text-white text-xs dark:bg-black/75">Rahul Dravid</div>
        </div>
        {/* Local Video - small corner */}
        <div className="absolute bottom-28 right-6 w-60 h-40 bg-black rounded-md overflow-hidden border-2 border-gray-400 shadow-md">
          <video className="w-full h-full object-cover" autoPlay playsInline muted />
          <div className="px-2 py-1 rounded-lg absolute bottom-5 left-5 bg-white/25 text-white text-xs dark:bg-black/75">You</div>
        </div>
        <div className="flex justify-center p-2 m-2 gap-2">
          <button onClick={()=>{setCamOn(!camOn)}}
          className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 cursor-pointer hover:scale-105  text-blue-900 dark:text-white w-12 h-12 rounded-full text-2xl flex justify-center items-center">
          { camOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button onClick={()=>{setMicOn(!micOn)}}
          className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:bg-gray-700 text-blue-900 dark:text-white  cursor-pointer hover:scale-105 transition-all  w-12 h-12 rounded-full text-2xl flex justify-center items-center">
          { micOn ? <FaMicrophoneAlt />: <FaMicrophoneLinesSlash />}
          </button>
        
          <button onClick={()=>{alert("Call ended")}}
          className="bg-red-500 text-white  cursor-pointer hover:scale-105 transition-all    w-12 h-12 rounded-full text-2xl flex justify-center items-center">
          <MdCallEnd />
          </button>
        </div>
      </div>
        

      </Model>   
    </>
  )
}

export default VideoCall
