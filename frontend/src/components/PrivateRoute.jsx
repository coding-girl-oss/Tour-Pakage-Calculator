import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const {userData} = useSelector((state)=> state.user)
  return userData.userData? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute
