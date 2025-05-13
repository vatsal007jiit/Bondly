import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import FriendList from "./components/FriendList";
import Friends from "./components/Friends";
import FriendRequest from "./components/FriendRequest";
import SendRequest from "./components/SendRequest";
import VideoCall from "./components/VideoCall";
import AudioCall from "./components/AudioCall";
import ChatBox from "./components/ChatBox";
import MyPost from "./components/MyPost";
import "remixicon/fonts/remixicon.css";
import NotFound from "./components/NotFound";
import UserContext from "./components/UserContext";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <UserContext.Provider value={{ loggedInUser: "Vatsal Gupta" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/friend" element={<Friends />}>
              {/*  Added index route to render FriendList by default */}
              <Route index element={<FriendList />} />
              <Route path="friendList" element={<FriendList />} />
              <Route path="friendRequest" element={<FriendRequest />} />
              <Route path="sendRequest" element={<SendRequest />} />
            </Route>
            <Route path="/video" element={<VideoCall />} />
            <Route path="/audio" element={<AudioCall />} />
            <Route path="/chat" element={<ChatBox />} />
            <Route path="/posts" element={<MyPost />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={1500} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
