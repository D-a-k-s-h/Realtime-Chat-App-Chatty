import React from 'react'
import { useSelector } from 'react-redux'

const ChatHeader = () => {

    const {onlineUsers} = useSelector((state) => state.users);
    const {userDetails} = useSelector((state) => state.users);

  return (
    <div className='w-full flex items-start justify-start border-b p-2 border-b-accent/70'>
        <div className='flex flex-row gap-2 items-center'>
            <img src={userDetails?.profilePic} alt='UserImage' className='aspect-square size-11 object-cover rounded-full'/>
            <div className='flex flex-col'>
                <p className='font-semibold'>{userDetails?.fullName}</p>
                <p className={`text-sm ${onlineUsers.includes(userDetails?._id) ? 'text-green-600' : 'text-accent/50'}`}>{onlineUsers.includes(userDetails?._id) ? 'Online' : 'Offline'}</p>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader