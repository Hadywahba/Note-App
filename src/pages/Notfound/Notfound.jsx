import React, { useEffect } from 'react'
import logo3 from "../../assets/5203299.jpg"
export default function Notfound() {
 useEffect(() => {
    document.body.style.overflow='hidden';
    return()=>{
      document.body.style.overflow='auto';
    }
  
   
  }, [])
  
  return (
   <div className='px-4 sm:px-24'>
<div className='flex justify-center items-center h-screen overflow-hidden'>
<img className='max-w-xl w-full' src={logo3} alt="" />
</div>
   </div>
  )
}
