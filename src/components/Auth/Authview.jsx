import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Authview(props) {
    if(localStorage.getItem('GetToken')){
        return <Navigate to={'/'}/>
    }else{
        return props.children 
    }
}
