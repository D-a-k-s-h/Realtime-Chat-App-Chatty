import React, { useState } from 'react'
import ChatHeader from './ChatHeader';
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import { Loader } from 'lucide-react';

const ChatContainer = () => {
  
  const [loading,setLoading] = useState(false);

  return (
    <div className='w-full h-full'>
      {
        loading ? (
          <div className='w-full h-full grid place-items-center'>
            <Loader className='size-10 animate-spin'/>
          </div>
        ) : (
          <div className='w-full h-[calc(100vh-8px)] flex flex-col justify-between'>
            <ChatHeader/>
            <MessagesContainer/>
            <MessageInput/>
          </div>
        )
      }
    </div>
  )
}

export default ChatContainer