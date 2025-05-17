import { toast } from "react-toastify";
import HttpInterceptor from "../lib/HttpInterceptor";
import catchErr from "../lib/CatchErr";
import { mutate } from "swr";

const logout = async (navigate: Function) => {
  try {
    await HttpInterceptor.post("/auth/logout");
    await mutate("/auth/session", null); // clear session in SWR
    toast.success("Logout Successful");
    navigate("/login");
  } catch (error) {
    catchErr(error);
  }
};

export default logout;