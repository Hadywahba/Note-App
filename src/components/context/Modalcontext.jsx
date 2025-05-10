import React, { createContext, useState } from 'react'
export const modalcontext=createContext()

export default function Modalcontext({children}) {
    const[showModal ,setshowModal]=useState(false)
    const[editnote ,seteditnote]=useState(null)
  return (
   <modalcontext.Provider value={{setshowModal ,showModal,editnote ,seteditnote }}>
    {children}
   </modalcontext.Provider>
  )
}
