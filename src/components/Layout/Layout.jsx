import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return (
  <div className='  dark:text-white min-h-screen  dark:bg-black bg-gray-300'>
  <aside  >
  <SideBar/>
  </aside>
  <main className=''  >
  <Outlet/>
  </main>
  </div>
  )
}
