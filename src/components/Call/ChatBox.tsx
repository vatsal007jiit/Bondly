import React, { useState } from "react";
import Model from "../shared/Model";
import Btn from "../shared/Btn";
import { IoIosCloseCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { GrAttachment } from "react-icons/gr";
import { socket } from "../../lib/socket";


type Message = {
  id: number;
  text: string;
  sender: "me" | "them";
};

const ChatBox: React.FC = () => {

  const location = useLocation()
  const { name, avatar } = location.state

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there!", sender: "them" },
    { id: 2, text: "Hello! How can I help you?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate()

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: newMessage, sender: "me" },
    ]);

    socket.on('connect',()=>{
      console.log("Connected to server:", socket.id)
    })
    socket.emit('message',`Frontend:${newMessage}`)

    socket.on('message',(msg)=>{
      console.log(msg)
    })




    setNewMessage("");
  };

  // useEffect(()=>{
  //   socket.on("connect", ()=>{
  //     console.log("Socket connected")
  //   })
  // }, [])

  return (
    <Model title="Chat">
        <div className="w-full max-w-2xl h-[500px] mx-auto border border-gray-300 bg-white dark:bg-gray-900 rounded-xl shadow-md flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 flex items-center gap-1 dark:bg-gray-800 px-4 py-3 text-lg font-semibold text-gray-900 dark:text-white relative">
             <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 " />
             <h1 className="capitalize">{name}</h1> 
             <button
                onClick={()=>{
                  socket.disconnect()
                  navigate('/home')}} 
                className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-gray-600 hover:dark:text-gray-200 transition-all cursor-pointer "><IoIosCloseCircle />
             </button>
          </div>
          {/* Messages */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`break-words max-w-[75%] px-4 py-2 rounded-lg text-sm  ${
                  msg.sender === "me"
                    ? "ml-auto bg-blue-600 text-white"
                    : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          {/* Input */}
          <div className="flex items-center border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800">
             <label className="relative cursor-pointer">
                    <input type="file" className="hidden" onChange={()=>{console.log('hi')}} />
                    <div className="w-10 h-10 mr-2 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-500 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 transition-all">
                        <GrAttachment className="text-xl" />
                    </div>
             </label>
             <input
                type="text"
                className="flex-1 px-3 py-2 mr-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
             />
             <Btn onclick={()=>{sendMessage()}}>Send</Btn>
          </div>
        </div>
    </Model>
  );
};

export default ChatBox;
