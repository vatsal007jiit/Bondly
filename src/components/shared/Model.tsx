import { FC, ReactNode } from 'react'
import SideMenu from './SideMenu'

interface ModelInterface{
    children?: ReactNode;
    title?: string;
}

const Model: FC<ModelInterface> = ({children,title}) => {
  return (
    <div>
      <div className="min-h-[calc(100vh-96px)] bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans flex">
       {/* Left Sidebar */}
       <SideMenu/>

       {/* Main Feed */}
       <main className="ml-[18%] flex-1 p-6 ">
         <h1 className="text-3xl font-bold text-center dark:text-white mb-8 drop-shadow-lg">{title}</h1>
         {children} 
       </main>
      </div>    
    </div>
  )
}

export default Model