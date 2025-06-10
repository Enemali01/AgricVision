import React from 'react'
import { useAuth } from '../components/Hooks/authContext'
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className='flex items-center justify-center space-x-2'>
      <div className='w-5 h-3 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin'></div>
      <div className='text-emerald-700 font-medium'>
        Loading..
      </div>
    </div>
  }

  return user ? children : <Navigate to='/' />

}

export default PrivateRoute