import { useContext, useEffect} from "react";
// import HttpInterceptor from "../lib/HttpInterceptor";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "./UserContext";
import useSWR from "swr";
import Fetcher from "../lib/Fetcher";

 const Guard = () => {
  const { session, setSession } = useContext(UserContext);

  const { data, error } = useSWR("/auth/session", Fetcher);

  useEffect(() => {
    if (data) {
      setSession(data);
    }
    if (error) {
      setSession(false);
    }
  }, [data, error]);


  if(session === null)
    return <div><h1 className="text-4xl font-bold text-center dark:text-white mb-8 drop-shadow-lg">Loading session...</h1></div>;

  if(session === false)
    <Navigate to="/login" replace />;

  return (<Outlet />);

};

export default Guard;

// const Guard = () => {

//   const { session, setSession } = useContext(UserContext);
//   const getSession =  () => {
//     try {
//       const { data } = await HttpInterceptor.get("/auth/session");

//       setSession(data);
//     } 
//     catch (error: any) {
//       setSession(false);
//     }
//   }

//   useEffect(() => {
//     getSession();
//   }, []);
