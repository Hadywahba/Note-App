import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return (
  <div className='  dark:text-white min-h-screen  dark:bg-black bg-slate-50'>
  <aside  >
  <SideBar/>
  </aside>
  <main className=''  >
  <Outlet/>
  </main>
  </div>
  )
}
