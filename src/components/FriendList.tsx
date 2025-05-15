import axios from 'axios';
import { useEffect, useState } from 'react';
import UserCard from './shared/UserCard';

const FriendList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // <- new loading state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://randomuser.me/api/?results=10');
      setUsers(data.results);
      setLoading(false); // after fetching
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  // Shimmer/Skeleton loading card
  const ShimmerCard = () => (
    <div className="bg-white dark:bg-gray-600 rounded-lg p-6 flex flex-col items-center animate-pulse shadow-2xl">
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
      <h1 className="text-4xl font-bold text-center dark:text-white mb-8 drop-shadow-lg">My Friends</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {
          loading 
          ? [...Array(8)].map((_, index) => <ShimmerCard key={index} />) 
          : users.map((usr, index) => (
              <UserCard key={index} name={usr.name.first} email={usr.email} avatar={usr.picture.large} Btn1='Message' Btn2='Unfriend'/>
            ))
        }
      </div>
    </>
  );
};

export default FriendList;
