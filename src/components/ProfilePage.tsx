import React, { useContext, useState } from "react";
import SideMenu from "./shared/SideMenu";
import UserContext from "./UserContext";
import moment from "moment";
import HttpInterceptor from "../lib/HttpInterceptor";
import catchErr from "../lib/CatchErr";
import { toast } from "react-toastify";
import { mutate } from "swr";
import uploadData from "../lib/Upload_Data";
import dp from "../lib/DP";
// import { downloadProfilePic } from "../lib/Download_Dp";

export default function ProfilePage() {
  
  const {session : user} = useContext(UserContext)
  // const avatar = (user.gender==='Male') ? avatarMale : avatarFem
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(dp(user.image, user.gender));
  const [fullName, setFullName] = useState(user.fullName);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(moment(user.dob).format("YYYY-MM-DD"));
  const [isUpdating, setIsUpdating] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // const donwload_dp = async() =>{
  //   const url=await downloadProfilePic(user.image)
  //   setImagePreview(url)
  // }
  // useEffect(()=>{
  //   if(user?.image)
  //     donwload_dp()
  // },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isUpdating) return; // Prevent multiple submissions
    
    try {
      setIsUpdating(true);
      const payload = {id:user.id , fullName, gender, dob, image: `https://bondly-network.s3.ap-south-1.amazonaws.com/profile-pic/dp_${user.id}.jpg` }
     
      const path = `profile-pic/dp_${user.id}.jpg`
      if (profileImage) {
         await uploadData(profileImage, path, "public-read"); // Ensures upload is complete before continuing so using await
      }
      await HttpInterceptor.post("/auth/updateProfile",payload)
    
      await mutate("/auth/refresh-Token")
      await mutate("/auth/session")
    
      toast.success("Profile Updated");
    }  
    catch (error: unknown) {
      catchErr(error)
    } finally {
      setIsUpdating(false);
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
                  imagePreview 
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
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
            disabled={isUpdating}
            className={`mx-auto px-6 py-2 cursor-pointer rounded-xl transition font-semibold flex gap-2 ${
              isUpdating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {isUpdating ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
      </main>
      
    </div>
  );
}
