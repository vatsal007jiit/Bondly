// import React, { useState, useEffect } from "react";
// import { PhoneOff } from "lucide-react";
// import { FaMicrophoneAlt} from "react-icons/fa";
// import { FaMicrophoneLinesSlash } from "react-icons/fa6";
// import Model from "../shared/Model";
// import { useLocation, useNavigate } from "react-router-dom";


// const AudioCall: React.FC = () => {

//   const location = useLocation()
//   const { name, avatar } = location.state

//   const [micOn, setMicOn] = useState(true);
//   const [seconds, setSeconds] = useState(0);
//   const navigate = useNavigate()

//   useEffect(() => {
//     const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (sec: number) => {
//     const mins = Math.floor(sec / 60).toString().padStart(2, "0");
//     const secs = (sec % 60).toString().padStart(2, "0");
//     return `${mins}:${secs}`;
//   };

//   return (
//     <Model>
//         <div className="w-[50%] mx-auto rounded-2xl border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex flex-col items-center justify-center p-6">
            
//           {/* Caller Info */}
//           <div className="text-center mb-8 ">
//             <h2 className="text-3xl font-bold mb-2">Calling</h2>
//             <h2 className="text-2xl capitalize font-semibold mb-2">{name}</h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Audio Call • {formatTime(seconds)}
//             </p>
//           </div>
//           {/* Avatar */}
//           <img src={avatar} alt="Avatar" className="border-1 w-48 h-48 rounded-full bg-gray-300 dark:bg-gray-700 mb-8" />
//           {/* Controls */}
//           <div className="flex space-x-6">
//             <button onClick={()=>{setMicOn(!micOn)}}
//                     className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:bg-gray-700
//                     text-blue-900 dark:text-white  cursor-pointer hover:scale-105 
//                     transition-all  w-16 h-16 rounded-full text-3xl flex justify-center items-center">
//                 { micOn ? <FaMicrophoneAlt />: <FaMicrophoneLinesSlash />}
//             </button>
//             <button onClick={()=>{navigate('/home')}} className=" w-16 h-16 rounded-full flex justify-center items-center bg-red-600 text-white hover:bg-red-700 transition">
//               <PhoneOff size={24} />
//             </button>
//           </div>
//         </div>
//     </Model>
//   );
// };

// export default AudioCall;

