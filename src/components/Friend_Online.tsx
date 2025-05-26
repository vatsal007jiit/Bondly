import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import useSWR from "swr";
import Fetcher from "../lib/Fetcher";
import { Skeleton } from "antd";
import OnlineCard from "./shared/OnlineCard";
import dp from "../lib/DP";

const Friend_Online = () => {
  const { data, isLoading } = useSWR("/friend/fetch", Fetcher);
  const [onlineUsers , setOnlineUsers]  = useState([])

  const onlineHandler = (users: any) => {
    setOnlineUsers(users);
    console.log("Online users updated:", users); // Debug log
  };

//   useEffect(() => {

//   socket.on("online", onlineHandler);

//   socket.emit("get-online")

//   // Cleanup on unmount
//   return () => {
//     socket.off("online", onlineHandler);
//   };
//  }, []);
useEffect(() => {
    // Ensure socket is connected before emitting
    if (socket.connected) {
      socket.emit("get-online");
    } else {
      // Listen for connect event to emit "get-online" when connection is established
      socket.on("connect", () => {
        console.log("Socket connected, emitting get-online");
        socket.emit("get-online");
      });
    }

    socket.on("online", onlineHandler);

    // Cleanup on unmount
    return () => {
      socket.off("online", onlineHandler);
      socket.off("connect");
    };
  }, []); // Empty dependency array since we handle connection status inside
  

  return (
    <div>
      <h2 className="text-2xl my-4 font-bold bg-gradient-to-r from-blue-800 to-pink-500 bg-clip-text text-transparent dark:text-indigo-400 border-b-1 border-indigo-200">
        Contacts
      </h2>
      <ul className="space-y-2 pb-16 text-gray-700 dark:text-gray-200 text-sm">
        {isLoading && <Skeleton active />}
        {/* {data?.friends &&
          (data?.friends).map((fd: any, index: number) => (
            <OnlineCard
              key={fd?._id}
              name={fd?.fullName}
              avatar={dp(fd?.image, fd?.gender)}
              status={index % 2 == 0 ? "online" : "offline"}
            />
          ))} */}
          {onlineUsers.map((usr,index)=>(
            <div key={index}>{usr.id}</div>
          ))}
        <div className="border-b-1 border-indigo-200 my-1"></div>
      </ul>
    </div>
  );
};

export default Friend_Online;


//new grok code
// import { useEffect, useState } from "react";
// import { socket } from "../lib/socket";
// import useSWR from "swr";
// import Fetcher from "../lib/Fetcher";
// import { Skeleton } from "antd";
// import OnlineCard from "./shared/OnlineCard";
// import dp from "../lib/DP";

// const Friend_Online = () => {
//   const { data, isLoading } = useSWR("/friend/fetch", Fetcher);
//   const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
//   const [isSocketLoading, setIsSocketLoading] = useState(true); // Track socket loading state

//   const onlineHandler = (users: any) => {
//     setOnlineUsers(users);
//     setIsSocketLoading(false); // Stop loading when users are received
//     console.log("Received online users:", users);
//   };

//   useEffect(() => {
//     const fetchOnlineUsers = () => {
//       console.log("Emitting get-online");
//       socket.emit("get-online");
//     };

//     // Attempt to fetch online users
//     if (socket.connected) {
//       fetchOnlineUsers();
//     } else {
//       socket.on("connect", () => {
//         console.log("Socket connected, fetching online users");
//         fetchOnlineUsers();
//         setIsSocketLoading(false);
//       });
//     }

//     // Retry fetching online users every 2 seconds, up to 3 attempts
//     let retryCount = 0;
//     const maxRetries = 3;
//     const retryInterval = setInterval(() => {
//       if (socket.connected && retryCount < maxRetries) {
//         fetchOnlineUsers();
//         retryCount++;
//       } else if (retryCount >= maxRetries) {
//         clearInterval(retryInterval);
//         setIsSocketLoading(false);
//         console.log("Stopped retrying: max attempts reached");
//       }
//     }, 2000);

//     socket.on("online", onlineHandler);

//     return () => {
//       clearInterval(retryInterval);
//       socket.off("connect");
//       socket.off("online", onlineHandler);
//     };
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl my-4 font-bold bg-gradient-to-r from-blue-800 to-pink-500 bg-clip-text text-transparent dark:text-indigo-400 border-b-1 border-indigo-200">
//         Contacts
//       </h2>
//       <ul className="space-y-2 pb-16 text-gray-700 dark:text-gray-200 text-sm">
//         {(isLoading || isSocketLoading) && <Skeleton active />}
//         {!isLoading && !isSocketLoading && onlineUsers.length === 0 && (
//           <li>No friends online</li>
//         )}
//         {!isLoading &&
//           onlineUsers.map((usr, index) => {
//             const friend = data?.friends?.find((f: any) => f.id === usr.id);
//             return (
//               friend && (
//                 <OnlineCard
//                   key={index}
//                   userId={usr.id}
//                   name={friend.fullName || "Unknown"}
//                   avatar={dp(friend.image, friend.gender)}
//                   status="online"
//                 />
//               )
//             );
//           })}
//         <div className="border-b-1 border-indigo-200 my-1"></div>
//       </ul>
//     </div>
//   );
// };

// export default Friend_Online;