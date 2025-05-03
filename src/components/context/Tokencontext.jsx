import {  createContext, useState } from "react"

export const tokencontext = createContext() 

export default function Tokencontext({children}) {
   let[token ,settoken ]=useState(null)
  return (
   <tokencontext.Provider value={{token ,settoken }}>
    {children}
   </tokencontext.Provider>
  )
}
