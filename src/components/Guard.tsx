import { useContext, useEffect} from "react";
// import HttpInterceptor from "../lib/HttpInterceptor";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "./UserContext";
import useSWR from "swr";
import Fetcher from "../lib/Fetcher";

 const Guard = () => {
  const { session, setSession } = useContext(UserContext);

  const { data, error, isLoading} = useSWR("/auth/session", Fetcher);

  useEffect(() => {
    if (data) {
      setSession(data);
      console.log("user---",session)
    }
    if (error ) {
      const timer = setTimeout(() => setSession(false), 200);
      return () => clearTimeout(timer);
      // setSession(false); //The problem is a race condition:
      // SWR fetches /auth/session immediately.
      // If the cookie hasn’t propagated fully yet, server sends 401.
      // Guard quickly sets session = false, redirecting you.
      // But shortly after, a valid session could be fetched.By delaying setSession(false), you're giving time for the cookie to settle and SWR to retry once.
      // It’s a soft debounce against false-negative 401s right after login.
    }
  }, [data, error]);


  if(isLoading || session === null )
    return <div><h1 className="text-4xl font-bold text-center dark:text-white mb-8 drop-shadow-lg">Loading session...</h1></div>;

  if(session === false)
    return <Navigate to="/login" replace />;

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
