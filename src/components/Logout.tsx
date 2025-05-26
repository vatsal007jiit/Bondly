import { toast } from "react-toastify";
import HttpInterceptor from "../lib/HttpInterceptor";
import catchErr from "../lib/CatchErr";
import { mutate } from "swr";
import { disconnectSocket } from "../lib/socket";


const logout = async (navigate: Function,setSession: Function) => {

  try {

    await HttpInterceptor.post("/auth/logout");

    setSession(null)
    mutate(() => true, undefined, { revalidate: false }); //  Clear SWR cache globally

    toast.success("Logout Successful");

    // Disconnect WebSocket
      disconnectSocket();

    navigate("/login");
  } 
  catch (error) {
    catchErr(error);
  }
};

export default logout;