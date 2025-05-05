import { FC } from 'react'
import Btn from './Btn'

interface UserInterface{
  name: string;
  email: string;
  avatar: string;
  Btn1?: string;
  Btn2?: string;
}

const UserCard: FC<UserInterface> = ({name, email, avatar, Btn1, Btn2}) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg  p-6 flex flex-col items-center shadow-2xl hover:scale-105 transition-transform duration-300">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-4 border-indigo-400 mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h2>
                <p className="text-gray-500 text-sm">{email}</p>

                <div className="flex gap-2 mt-4">
                  <Btn>{Btn1}</Btn>
                  <Btn type='secondary'>{Btn2}</Btn>
                </div>
              </div>
    </>
  )
}

export default UserCard
