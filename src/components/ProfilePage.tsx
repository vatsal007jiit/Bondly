import React, { useContext, useEffect, useState } from "react";
import SideMenu from "./shared/SideMenu";
import avatar from "./../Images/avatar.webp";
import UserContext from "./UserContext";
import moment from "moment";
import HttpInterceptor from "../lib/HttpInterceptor";
import catchErr from "../lib/CatchErr";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function ProfilePage() {
  
  const {session , setSession} = useContext(UserContext)
  const user = session
  
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(user.image);
  const [fullName, setFullName] = useState(user.fullName);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(moment(user.dob).format("YYYY-MM-DD"));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadProfilePic = async (profileImage: any)=>{
    try {
      const payload = {
        path:`profile-pic/dp_${user.id}.jpg`,
        type:profileImage?.type
      }

      const options = {
        headers:{
          'Content-Type': profileImage?.type
        }
      }
      const {data} = await HttpInterceptor.post('/storage/upload', payload)
      // console.log(data)
      const response = await HttpInterceptor.put(data.url, profileImage, options)
      console.log("ETag:", response.headers.etag);
    } 
    catch (error: unknown) {
      catchErr(error)
    }
  }

  const downloadProfilePic = async () =>{
    try {

      const payload = {
        path:`profile-pic/${user.image}`,
      }
      const {data} = await HttpInterceptor.post("/storage/download",payload)
      setImagePreview(data.url)
      // console.log('DP Link is:', data)
    } 
    catch (error: unknown) {
      catchErr(error)
    }
  }

  useEffect(()=>{
    downloadProfilePic()
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {id:user.id , fullName, gender, dob, image: `dp_${user.id}.jpg` }
      console.log(payload);
      if (profileImage) {
         await uploadProfilePic(profileImage); // Ensures upload is complete before continuing so using await
      }
      const {data} = await HttpInterceptor.post("/auth/updateProfile",payload)
      console.log(data)

      await mutate("/auth/refresh-Token")
      setSession() // This will run mutate for useSWR('/auth/session')
      toast.success("Profile Updated");
    } 
    catch (error: unknown) {
      catchErr(error)
    }
  };

  return (

    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans flex">
      <SideMenu/>
      <main className="lg:ml-[20%] flex-1 p-6 mx-auto space-y-6">
        <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-md dark:bg-gray-700 bg-white dark:text-white text-gray-900">
        <h1 className="text-4xl font-bold text-center dark:text-white mb-8 drop-shadow-lg">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-5  ">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="profilePic" className="cursor-pointer">
              <img
                src={
                  imagePreview || avatar
                }
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 dark:border-gray-200 shadow"
              />
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              Click to change
            </span>
          </div>
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 font-semibold rounded-xl bg-gray-200 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 font-semibold  rounded-xl bg-gray-200 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 font-semibold  rounded-xl bg-gray-200 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Save Button */}
          <button
            type="submit"
            className="mx-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 cursor-pointer rounded-xl transition font-semibold flex gap-2"
          >
            Save Changes
          </button>
        </form>
      </div>
      </main>
      
    </div>
  );
}
