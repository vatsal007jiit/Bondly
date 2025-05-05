import { useEffect, useState } from 'react';
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className='min-h-screen flex flex-col'>
      <Header toggleDark={() => setDarkMode(!darkMode)} />
      <Outlet/>
    </div>
  )
}

export default Layout
