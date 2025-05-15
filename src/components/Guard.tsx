import { useContext, useEffect } from "react";
import HttpInterceptor from "../lib/HttpInterceptor";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "./UserContext";

const Guard = () => {
  const { session, setSession } = useContext(UserContext);

  const getSession = async () => {
    try {
      const { data } = await HttpInterceptor.get("/auth/session");
      setSession(data);
    } catch (error: any) {
      setSession(false);
    }
  }

  useEffect(() => {
    getSession();
    console.log(session)
  }, []);

  if (session === null) return null;

  if (session === false) return <Navigate to="/login" replace />;

  return (<Outlet />);
};

export default Guard;
