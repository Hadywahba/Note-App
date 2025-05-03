import axios from 'axios'
import React, { createContext } from 'react'


export const authcontext = createContext() 

export default function Authcontext({children}) {

  async function getRegisterFn(values) {
try {
    const data = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,values)
    console.log(data)
    return data
} catch (error) {
    console.log(error)
    throw error
}
    }


    const getLoginFn= async(values)=>{
try {
  const data = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,values)
  return  data ;
} catch (error) {
  console.log(error)
  throw error
}
    }
  return (
   <authcontext.Provider value={{getRegisterFn , getLoginFn}} >
{children}
   </authcontext.Provider>
  )
}
