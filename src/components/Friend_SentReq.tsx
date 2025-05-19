import { useEffect, useState } from "react";
import UserCard from "./shared/UserCard";
import HttpInterceptor from "../lib/HttpInterceptor";
import dp from "../lib/DP";
import Empty from "./shared/Empty";
import { toast } from "react-toastify";
import catchErr from "../lib/CatchErr";

const Friend_SentReq = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // <- new loading state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await HttpInterceptor.get("/friend/sent");
      console.log(data.sentRequest);
      if (data.friends) {
        setUsers(data.friends);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  const cancelRequest = async (id: string) => {
    try {
      const payload = {
        id,
      };
      const { data } = await HttpInterceptor.post("/friend/cancel", payload);
      toast.success(data.message);
      fetchData()
    } catch (error: unknown) {
      catchErr(error);
    }
  };

  // Shimmer/Skeleton loading card
  const ShimmerCard = () => (
    <div className="bg-white dark:bg-gray-600  rounded-lg p-6 flex flex-col items-center animate-pulse shadow-2xl">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
      <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-3 w-24 bg-gray-200 rounded"></div>
      <div className="flex gap-2 mt-4">
        <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
        <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <>
      <h1 className="text-4xl font-bold text-center dark:text-white mb-8 drop-shadow-lg">
        Friend Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          [...Array(8)].map((_, idx) => <ShimmerCard key={idx} />)
        ) : users.length === 0 ? (
          <Empty />
        ) : (
          users.map((usr: any) => (
            <UserCard
              key={usr._id}
              name={usr.fullName}
              email={usr.email}
              avatar={dp(usr.image, usr.gender)}
              Btn2="Cancel Request"
              click2={() => cancelRequest(usr._id)}
              icon2="user-minus-line"
            />
          ))
        )}
      </div>
    </>
  );
};

export default Friend_SentReq;
