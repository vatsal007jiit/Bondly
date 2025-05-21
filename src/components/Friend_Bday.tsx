import { useEffect, useState } from "react";
import UserCard from "./shared/UserCard";
import dp from "../lib/DP";
import HttpInterceptor from "../lib/HttpInterceptor";
import moment from "moment";
import Empty from "./shared/Empty";

const Friend_Bday = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // <- new loading state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await HttpInterceptor.get("/friend/fetch");
      console.log(data.friends);
      if (data.friends) {
        setUsers(data.friends);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  const format = (dob: string) => {
    const dobMoment = moment(dob);
    if (!dobMoment.isValid()) return "Invalid date";

    const today = moment();
    const currentYear = today.year();

    let targetDate = moment({
      year: currentYear,
      month: dobMoment.month(),
      day: dobMoment.date(),
    });

    if (targetDate.isBefore(today, "day")) {
      targetDate = targetDate.add(1, "year");
    }

    const formattedDate = targetDate.format("Do MMMM");
    const daysLeft = targetDate.diff(today, "days");

    if (daysLeft > 31) {
      const monthsLeft = targetDate.diff(today, "months");
      return `${formattedDate} - ${monthsLeft} month${
        monthsLeft > 1 ? "s" : ""
      } to go`;
    } else {
      return `${formattedDate} - ${daysLeft} day${
        daysLeft !== 1 ? "s" : ""
      } to go`;
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
        Happy Birthday
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          [...Array(8)].map((_, idx) => <ShimmerCard key={idx} />)
        ) : users.length === 0 ? (
          <Empty />
        ) : (
          users.map((usr: any) => (
            <UserCard
              key={usr?._id}
              name={usr?.fullName}
              dob={format(usr?.dob)}
              avatar={dp(usr?.image, usr?.gender)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Friend_Bday;
