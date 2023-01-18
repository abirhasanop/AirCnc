import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Pages/Shared/Navbar'

const Main = () => {
  return (
    <div className='h-screen'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default Main
