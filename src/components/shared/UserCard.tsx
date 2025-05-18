import { FC, useEffect, useState } from 'react'
import Btn from './Btn'
import avatarMale from "../../Images/avatar.webp";
import avatarFem from "../../Images/avatar-fem.png";

import { downloadProfilePic } from '../../lib/Download_Dp';
interface UserInterface{
  name: string;
  email: string;
  avatar: string;
  gender: string;
  Btn1?: string;
  Btn2?: string;
  icon?: string
}

const UserCard: FC<UserInterface> = ({name, email, avatar, gender , Btn1, Btn2, icon}) => {


const [imagePreview, setImagePreview] = useState(
    gender === "Male" ? avatarMale : avatarFem
  );

  const donwload_dp = async () => {
    const url = await downloadProfilePic(avatar);
    setImagePreview(url);
  };

  useEffect(() => {
    if(avatar)
      donwload_dp()
  }, []);



  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg  p-6 flex flex-col items-center shadow-2xl hover:scale-105 transition-transform duration-300">
                <img
                  src={imagePreview}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-4 border-indigo-400 mb-4"
                />
                <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-white">{name}</h2>
                <p className="text-gray-500 text-sm">{email}</p>

                <div className="flex gap-2 mt-4">
                  <Btn icon={icon}>{Btn1}</Btn>
                  {Btn2 && <Btn type='secondary'>{Btn2}</Btn>}
                </div>
              </div>
    </>
  )
}

export default UserCard
