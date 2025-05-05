import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Layout from "./components/Layout"
import FriendList from "./components/FriendList"
import Friends from "./components/Friends"
import FriendRequest from "./components/FriendRequest"
import SendRequest from "./components/SendRequest"
import VideoCall from "./components/VideoCall"

function App() {
 

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login/>}></Route>
    //     <Route path="/" element={<Layout/>}>
    //       <Route path="/home" element={<Home/>}></Route>
    //       <Route path="/friend" element={<Friends/>}>
    //         <Route path="/friend/friendList" element={<FriendList/>}></Route>
    //         <Route path="/friend/friendRequest" element={<FriendRequest/>}></Route>
    //         <Route path="/friend/sendRequest" element={<SendRequest/>}></Route>
    //       </Route>
    //     </Route>
    //     <Route path="/login" element={<Login/>}></Route>
    //     <Route path="/signup" element={<Signup/>}></Route>
    //   </Routes>
    // </BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/friend" element={<Friends />}>
              {/* 👇 Add this index route to render FriendList by default */}
              <Route index element={<FriendList />} />
              <Route path="friendList" element={<FriendList />} />
              <Route path="friendRequest" element={<FriendRequest />} />
              <Route path="sendRequest" element={<SendRequest />} />
            </Route>
            <Route path="/video" element={<VideoCall/>} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>

  )
}

export default App
