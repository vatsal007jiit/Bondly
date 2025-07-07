import React from 'react'

const buttonModel = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 cursor-pointer rounded-xl transition font-semibold flex gap-2",
    secondary: "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 cursor-pointer dark:hover:bg-gray-700 dark:text-white font-semibold py-2 px-4 rounded-lg transition flex gap-2",
    light:"bg-blue-400 hover:bg-blue-600  cursor-pointer px-6 py-2 rounded-xl transition font-semibold flex gap-2",
    disabled:"px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg opacity-50 cursor-not-allowed"
}
interface ButtonInterface {
    children?: string;
    type?: "primary" | "secondary" | "light" | "disabled";
    onclick?: (() => void) | ((...args: any[]) => void);
    icon?: string
}

const Btn: React.FC<ButtonInterface> = ({children="Message",type="primary",onclick, icon}) => {
  return (
    <div>
      <button className={buttonModel[type]} onClick={onclick}>
           {icon && <i className={`ri-${icon} mr-1 text-xl`}></i>} 
           {children}
      </button>
    </div>
  )
}

export default Btn
