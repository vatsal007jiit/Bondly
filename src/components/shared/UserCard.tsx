import { FC } from 'react'
import Btn from './Btn'
interface UserInterface{
  name: string;
  email?: string;
  dob?: string
  avatar: string;
  Btn1?: string;
  click1?: (id: string)=> void
  Btn2?: string;
  click2?: (id: string)=> void
  icon1?: string
  icon2?: string
}

const UserCard: FC<UserInterface> = ({name, email, dob, avatar, Btn1, click1, Btn2, click2, icon1, icon2}) => {

  

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg  p-6 flex flex-col items-center shadow-2xl hover:scale-105 transition-transform duration-300">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-4 border-indigo-400 mb-4"
                />
                <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-white">{name}</h2>
                <p className="text-gray-500 text-sm">{email}</p>
                {dob && <div className="mt-4 text-center">
                <div className="inline-block bg-indigo-100 dark:bg-indigo-900 rounded-full px-4 py-1 shadow-md">
                  <span className="block text-indigo-700 dark:text-indigo-300 text-lg font-semibold">
                    {dob?.split(' - ')[0]}
                  </span>
                  <span className="block text-indigo-500 dark:text-indigo-400 text-sm tracking-wide">
                    {dob?.split(' - ')[1]}
                  </span>
                </div>
                </div>}

                <div className="flex gap-2 mt-4">
                  {Btn1 && <Btn icon={icon1} onclick={click1}>{Btn1}</Btn>}
                  {Btn2 && <Btn icon={icon2} onclick={click2} type='secondary'>{Btn2}</Btn>}
                </div>
              </div>
    </>
  )
}

export default UserCard
