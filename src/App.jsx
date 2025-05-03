import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Notfound from './pages/Notfound/Notfound'
import { tokencontext } from './components/context/tokenContext'
import Authview from './components/Auth/Authview'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'

export default function App() {
const{settoken}=useContext(tokencontext)
useEffect(() => {
  if(localStorage.getItem('GetToken')){
    settoken(localStorage.getItem('GetToken'))
  }

  
}, [])


  const router = createBrowserRouter([
    { path : "" , element :<Layout/> , children : [
      {index :true , element :<ProtectedRoutes> <Home/> </ProtectedRoutes>} ,
      {path : "register" , element : <Authview> <Register/> </Authview>} ,
      {path : "login" , element : <Authview> <Login/> </Authview>} ,
      {path : "*" , element : <Notfound/>} ,
    ]

  }])
  return (
    <RouterProvider router={router}/>
  )
}
