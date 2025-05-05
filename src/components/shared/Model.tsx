import { FC, ReactNode } from 'react'
import SideMenu from './SideMenu'

interface ModelInterface{
    children?:ReactNode
}

const Model: FC<ModelInterface> = ({children}) => {
  return (
    <div>
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans flex">
       {/* Left Sidebar */}
       <SideMenu/>

       {/* Main Feed */}
       <main className="ml-[18%] mr-[22%] mb-8 flex-1 p-6 space-y-6">
         {children} 
       </main>
      </div>    
    </div>
  )
}

export default Model