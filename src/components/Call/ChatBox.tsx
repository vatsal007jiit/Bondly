import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Model from "../shared/Model";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { GrAttachment } from "react-icons/gr";
import { socket } from "../../lib/socket";
import UserContext from "../UserContext";

interface msgRecInterface{
  from: string
  to: string
  message: string
}

const ChatBox: React.FC = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement>(null);
  const { session: user } = useContext(UserContext);
  const {id, name, avatar } = location.state
  const [chats, setChats] = useState<msgRecInterface[]>([]) 
  const [fileName, setFileName] = useState<string | null>(null);


  const sendMessage = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    // const form = e.currentTarget
    // const message = form.message.value
    const message = inputRef.current?.value;
    if (!message?.trim()) return;

    const payload = {
      from: user.id,
      to: id,
      message
    }
    setChats((prev)=>[...prev, payload])

    socket.emit('message', payload)

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const messageHandler = (messageRecieved : msgRecInterface)=>{
    console.log(messageRecieved.message)
    setChats((prev)=>[
      ...prev,
      messageRecieved
    ])
  }

  useEffect(()=>{
    socket.on("message", messageHandler)

    return ()=>{
      socket.off("message", messageHandler)
    }
  }, [])

  return (
    <Model title="Chat">
       <div className="w-full max-w-2xl h-[500px] mx-auto border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 dark:bg-gray-800 flex items-center gap-3 px-4 py-3 text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
          <img src={avatar} alt="Avatar" className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700" />
          <h1 className="capitalize">{name}</h1>
          <button
            onClick={() => {
              // socket.disconnect();
              navigate("/home");
            }}
            className="ml-auto text-2xl text-gray-400 hover:text-gray-600 hover:dark:text-gray-200 transition-all"
          >
            <IoIosCloseCircle />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-gray-50 dark:bg-gray-900 scroll-smooth">
          {chats.map((msg, index) => {
            const isSender = msg.from === user.id;
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={index}
                className={`max-w-[55%] px-4 py-2 rounded-xl capitalize text-sm break-words relative group ${
                  isSender
                    ? "ml-auto bg-indigo-600 text-white"
                    : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                <div className={`text-xs font-semibold mb-1 ${isSender ? "text-gray-200" : "text-indigo-500"}`}>
                  {isSender ? "You" : name}
                </div>
                <div>{msg.message}</div>
                <div className={`absolute text-[10px] bottom-1 right-2 opacity-70 ${isSender ? "text-white" : "text-gray-500"}`}>
                  {time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 flex items-center gap-2">
          {/* Attachment */}
          <label className="relative cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFileName(file.name);
                } else {
                  setFileName(null);
                }
              }}
            />

            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-600 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 transition-all">
              <GrAttachment className="text-xl" />
            </div>
          </label>

          {/* Chat input */}
          <div className="flex flex-col w-full gap-1">
            <form onSubmit={sendMessage} className="flex flex-1 gap-2 items-center">
              <input
                ref={inputRef}
                name="message"
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold transition"
              >
                Send
              </button>
            </form>

            {/* 📎 Show selected file name below input */}
            {fileName && (
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1 truncate  pr-2">
                <span className="truncate">
                  📎 Attached: <span className="font-medium">{fileName}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFileName(null)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <MdDelete className="text-base" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
 
    </Model>
  );
};

export default ChatBox;



//<div className="w-full max-w-2xl h-[500px] mx-auto border border-gray-300 bg-white dark:bg-gray-900 rounded-xl shadow-md flex flex-col overflow-hidden">
          {/* Header */}
    //       <div className="bg-gray-100 flex items-center gap-1 dark:bg-gray-800 px-4 py-3 text-lg font-semibold text-gray-900 dark:text-white relative">
    //          <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 " />
    //          <h1 className="capitalize">{name}</h1> 
    //          <button
    //             onClick={()=>{
    //               socket.disconnect()
    //               navigate('/home')}} 
    //             className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-gray-600 hover:dark:text-gray-200 transition-all cursor-pointer "><IoIosCloseCircle />
    //          </button>
    //       </div>
    //       {/* Messages */}
    //       <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-gray-50 dark:bg-gray-900">
    //         {chats.map((msg, index) => (
    //           <div
    //             key={index}
    //             className={`break-words max-w-[75%] px-4 py-2 rounded-lg text-sm  ${
    //               msg.from === user.id
    //                 ? "ml-auto bg-blue-600 text-white"
    //                 : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    //             }`}
    //           >
    //             {msg.from !== user.id && (
    //   <div className="text-xs font-medium text-indigo-500 mb-1 capitalize">{name}</div>
    // )}
    // {msg.from === user.id && (
    //   <div className="text-xs font-medium text-right text-white mb-1">You</div>
    // )}
    //             {msg.message}
    //           </div>
    //         ))}
    //       </div>
    //       {/* Input */}
    //       <div className="flex items-center border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800">
    //          <label className="relative cursor-pointer">
    //                 <input type="file" className="hidden" onChange={()=>{console.log('hi')}} />
    //                 <div className="w-10 h-10 mr-2 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-500 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 transition-all">
    //                     <GrAttachment className="text-xl" />
    //                 </div>
    //          </label>
    //          {/* <form onSubmit={}></form>
    //          <input
    //             type="text"
    //             className="flex-1 px-3 py-2 mr-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    //             placeholder="Type your message..."
    //             value={newMessage}
    //             onChange={(e) => setNewMessage(e.target.value)}
    //             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //          />
    //          <Btn onclick={()=>{sendMessage()}}>Send</Btn> */}
    //           <form onSubmit={sendMessage} className="flex flex-1">
    //             <input type="text" ref={inputRef} name="message" placeholder="Type your message..."  className="flex-1 px-3 py-2 mr-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
    //             <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 cursor-pointer rounded-xl transition font-semibold flex gap-2">Send</button>
    //           </form>
    //       </div>
    //     </div>