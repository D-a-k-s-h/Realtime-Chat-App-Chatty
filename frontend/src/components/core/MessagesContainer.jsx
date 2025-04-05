import React, { useEffect, useRef, useState } from 'react'
import { formatTime } from '../../utils/formatDate'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, updateMessages } from '../../slices/messageSlice';
import { getMessages, getUserDetails } from '../../services/operations/messageAPI';
import { setUsersDetails } from '../../slices/UsersSlice';
import { useLocation, useParams } from 'react-router-dom';
import MessageSkeleton from '../../skeletons/MessageSkeleton';

const MessagesContainer = () => {
  
  const {user} = useSelector((state) => state.auth);
  const {messages} = useSelector((state) => state.message);
  console.log("Messages -> ",messages);
  const {userDetails} = useSelector((state) => state.users);
  const messageEndRef = useRef();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const location = useLocation();
  const receiverId = location.pathname.split("/").at(-1);
  const {token} = useSelector((state) => state.auth);
  const {socket} = useSelector((state) => state.auth);
  

  const fetchMessages = async() => {
      setLoading(true);
      const response = await dispatch(getMessages(receiverId,token));
      console.log(response);
      if(response){
        dispatch(setMessages(response));
      }
      setLoading(false);
    }
  
    const fetchUsersDetails = async() => {
      const response = await dispatch(getUserDetails(receiverId,token));
      if(response){
        dispatch(setUsersDetails(response));
      }
    }
  
    const subscribeToMessages = () => {
      if(!userDetails){
        return;
      }
  
      socket.on("newMessage",(newMessage) => {
        //if different user is selected
        if(newMessage?.senderId !== userDetails?._id){
          return;
        }
  
        dispatch(updateMessages(newMessage));
        console.log("newMessage -> ",newMessage);
      })
    }
  
    const unsubscribeToMessages = () => {
      if(socket){
        socket.off("newMessage");
      }
    }
  
    useEffect(() => {
  
      fetchUsersDetails();
      subscribeToMessages();
  
      return () => unsubscribeToMessages();
    },[receiverId,socket,messages.length]);

    useEffect(() => {
      fetchMessages();
    },[receiverId]);
  
    useEffect(() => {
      if(messageEndRef.current && messages){
        messageEndRef.current.scrollIntoView({behavior:"smooth"});
      }
    },[messages]);

  return (
    <>
      {
        loading ? (
          <MessageSkeleton/>
        ) : (
          <div className='w-full h-full flex flex-col overflow-auto p-4'>
            {
              messages && messages.map((message) => (
                <div key={message?._id} className={`chat ${message?.senderId === user?._id ? 'chat-end' : 'chat-start'}`} ref={messageEndRef}>
                  <div className='chat-image avatar'>
                    <div className='size-10 rounded-full border'>
                      <img src={`${message?.senderId === user?._id ? user?.profilePic : userDetails?.profilePic}`} alt='profilePic'/>
                    </div>
                  </div>
                  <div className='chat-header mb-1'>
                    <time className='text-xs opacity-50 ml-1'>
                      {formatTime(message?.createdAt)}
                    </time>
                  </div>
                  <div className='chat-bubble rounded-xl'>
                    {
                      message.image && (
                        <img src={message?.image} alt='attachement' className='max-w-[200px] rounded-md mb-2'/>
                      )
                    }
                    {
                      message?.text && (<p>{message?.text}</p>)
                    }
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </>
  )
}

export default MessagesContainer