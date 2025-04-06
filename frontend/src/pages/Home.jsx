import React from 'react'
import Sidebar from '../components/core/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-screen bg-base-200'>
      <div className='w-full h-full md:grid md:place-items-center md:my-10 p-2'>
        <div className='w-full max-w-6xl bg-base-100 rounded-lg shadow-xl h-[calc(100vh-8px)]'>
          <div className='w-full flex h-full overflow-hidden rounded-lg'>
            <Sidebar/>
            <div className='w-full h-full overflow-auto grid place-items-center'>
              <Outlet/>
            </div>
          </div>
        </div>
      </div>    
    </div>
  )
}

export default Home