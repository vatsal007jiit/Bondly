// import { useRef, useState } from "react";
// import Model from "../shared/Model";
// import { FaVideo, FaVideoSlash, FaMicrophoneAlt } from "react-icons/fa";
// import { FaMicrophoneLinesSlash } from "react-icons/fa6";
// import { MdOutlineScreenShare, MdOutlineStopScreenShare } from "react-icons/md";
// import { MdCallEnd } from "react-icons/md";
// import { useLocation, useNavigate } from "react-router-dom";
// import catchErr from "../../lib/CatchErr";

// const VideoCall = () => {
//   const location = useLocation();
//   const {name} = location.state;
//   const localVideoRef = useRef<HTMLVideoElement>(null)
//   const [mic, setMic] = useState(false);
//   const [cam, setCam] = useState(false);
//   const [screen, setScreen] = useState(false);

//   const navigate = useNavigate();
  
//   const toggleScreen= async (screen: boolean) =>{
//     try {

//       const stream = await navigator.mediaDevices.getDisplayMedia({video: true})
//       const localVideo = localVideoRef.current

//       if(!localVideo)
//       {
//         return
//       }
//       localVideo.srcObject = stream
//       setScreen(!screen);
//     } 
//     catch (error) {
//       catchErr(error)
//     }
    
  
//   }
//   const toggleVideo= (cam) =>{
//     setCam(!cam);
//     alert('on')
//   }
//   const toggleAudio= (mic) =>{
//     setMic(!mic);
//     alert('on')
//   }

//   return (
//     <>
//       <Model title="Video Call">
//         {/* Remote Video */}
//         <div className="relative w-full h-screen bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 flex flex-col items-center justify-center">
//           <div className="w-full h-[70%] bg-black rounded-xl overflow-hidden mb-4 relative">
//             <video
//               className="w-full h-full object-cover"
//               autoPlay
//               playsInline
//               muted
//             />
//             <div className="px-2 py-1 rounded-lg absolute bottom-5 left-5 bg-white/25 text-white text-xs capitalize">
//               {name}
//             </div>
//           </div>
//           {/* Local Video - small corner */}
//           <div className="absolute bottom-28 right-6 w-60 h-40 bg-black rounded-md overflow-hidden border-2 border-gray-400 shadow-md">
//             <video
//               ref= {localVideoRef}
//               className="w-full h-full object-cover"
//               autoPlay
//               playsInline
//               muted
//             />
//             <div className="px-2 py-1 rounded-lg absolute bottom-5 left-5 bg-white/25 text-white text-xs">
//               You
//             </div>
//           </div>
//           <div className="flex justify-center p-2 m-2 gap-2">
//             <button title="Video"
//               onClick={() => {
//                 toggleVideo(cam)
//               }}
//               className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 cursor-pointer hover:scale-105  text-blue-900 dark:text-white w-12 h-12 rounded-full text-2xl flex justify-center items-center"
//             >
//               {cam ? <FaVideo /> : <FaVideoSlash />}
//             </button>
//             <button title="Audio"
//               onClick={() => {
//                 toggleAudio(mic)
//               }}
//               className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:bg-gray-700 text-blue-900 dark:text-white  cursor-pointer hover:scale-105 transition-all  w-12 h-12 rounded-full text-2xl flex justify-center items-center"
//             >
//               {mic ? <FaMicrophoneAlt /> : <FaMicrophoneLinesSlash />}
//             </button>

//             <button title="Screen Share"
//               onClick={() => {
//                 toggleScreen(screen)
//               }}
//               className="bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-500 dark:bg-gray-700 text-blue-900 dark:text-white  cursor-pointer hover:scale-105 transition-all  w-12 h-12 rounded-full text-2xl flex justify-center items-center"
//             >
//               {screen ? <MdOutlineScreenShare /> : <MdOutlineStopScreenShare />}
//             </button>

//             <button
//               onClick={() => {
//                 navigate("/home");
//               }}
//               className="bg-red-500 text-white  cursor-pointer hover:scale-105 transition-all    w-12 h-12 rounded-full text-2xl flex justify-center items-center"
//             >
//               <MdCallEnd />
//             </button>
//           </div>
//         </div>
//       </Model>
//     </>
//   );
// };

// export default VideoCall;
