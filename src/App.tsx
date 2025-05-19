import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import FriendList from "./components/FriendList";
import Friends from "./components/Friends_Nav";
import FriendRequest from "./components/FriendRequest";
import SendRequest from "./components/Friend_Suggestion";
import VideoCall from "./components/VideoCall";
import AudioCall from "./components/AudioCall";
import ChatBox from "./components/ChatBox";
import MyPost from "./components/MyPost";
import "remixicon/fonts/remixicon.css";
import NotFound from "./components/NotFound";
import UserContext from "./components/UserContext";
import { ToastContainer } from 'react-toastify';
import Guard from "./components/Guard";
import { useState } from "react";
import ProfilePage from "./components/ProfilePage";
import Friend_SentReq from "./components/Friend_SentReq";
import Friend_Bday from "./components/Friend_Bday";
// import useSWR from "swr";
// import Fetcher from "./lib/Fetcher";

function App() {

  const [session, setSession] = useState(null) // old code with no swr [But we used it so that when we change profile page submit ,user data on sidemenu should change live]
 
  // const {data: session, mutate: mutateSession} = useSWR('/auth/session', Fetcher); //This was running request on login page also and we were getting 401 error again and again so replaced with below
  
  return (
    <UserContext.Provider value={{ session, setSession}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route element={<Guard/>}>
              <Route path="/home" element={<Home />} />
              <Route path="/friend" element={<Friends />}>
                {/*  Added index route to render FriendList by default */}
                <Route index element={<FriendList />} />
                <Route path="friendList" element={<FriendList />} />
                <Route path="friendRequest" element={<FriendRequest />} />
                <Route path="sendRequest" element={<SendRequest />} />
                <Route path="sent" element={<Friend_SentReq />} />
                <Route path="bday" element={<Friend_Bday />} />
              </Route>
              <Route path="/profile" element={<ProfilePage/>} />
              <Route path="/video" element={<VideoCall />} />
              <Route path="/audio" element={<AudioCall />} />
              <Route path="/chat" element={<ChatBox />} />
              <Route path="/posts" element={<MyPost />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={1000} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
