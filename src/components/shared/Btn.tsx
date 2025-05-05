import React from 'react'

const buttonModel = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition font-semibold",
    secondary: "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white font-semibold py-2 px-4 rounded-lg transition"
}
interface ButtonInterface {
    children?: string;
    type?: "primary" | "secondary";
    onclick?: ()=>void
}

const Btn: React.FC<ButtonInterface> = ({children="Message",type="primary",onclick}) => {
  return (
    <div>
      <button className={buttonModel[type]} onClick={onclick}>
            {children}
      </button>
    </div>
  )
}

export default Btn
