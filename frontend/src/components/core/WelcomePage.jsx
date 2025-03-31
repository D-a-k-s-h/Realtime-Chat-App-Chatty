import React from 'react'
import { CiChat1 } from "react-icons/ci";


const WelcomePage = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <p className='bg-base-300 p-2 w-fit rounded-lg animate-bounce text-3xl'><CiChat1/></p>
      <p className='font-bold text-2xl text-center'>Welcome to Chatty!</p>
      <p className='text-center'>Select a conversation from sidebar to start chatting.</p>
    </div>
  )
}

export default WelcomePage