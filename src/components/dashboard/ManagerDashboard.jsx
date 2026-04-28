'use client'
import { AuthContext } from '@/contexts/AuthContext'
import React, { useContext } from 'react'
const ManagerDashboard = () => {
  const {user} = useContext(AuthContext);  
  return (
    <div className='flex justify-center mt-10'>
        <h1>This is the {user?.name} Dashboard</h1>
    </div>
  )
}

export default ManagerDashboard