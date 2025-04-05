import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../services/operations/messageAPI';
import { LuUsers } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SidebarSkeleton from '../../skeletons/SidebarSkeleton';

const Sidebar = () => {

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const [users,setUsers] = useState([]);
  const {onlineUsers} = useSelector((state) => state.users);
  console.log("Online users -> ",onlineUsers);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [showOnlineUsers,setShowOnlineUsers] = useState(false);

  const fetchUsers = async() => {
    setLoading(true);
    try{
      const result = await dispatch(getAllUsers(token));
      if (result) {
        setUsers(result);
      }

    } catch(error){
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  },[]);

  const filteredUsers = showOnlineUsers ? users.filter(user => onlineUsers.includes(user?._id)) : users;

  return (
    <>
      {
        loading ? (
          <SidebarSkeleton/>
        ) : (
          <div className='w-fit md:w-[40%] h-full flex flex-col border-r border-r-accent'>
            <div className='p-4 flex flex-col items-center'>
              <div className='flex items-center gap-2 text-lg font-semibold pb-2'>
                <LuUsers className='text-xl'/>
                <p className='hidden md:block'>Contacts</p>
              </div>
              <div className='flex flex-row items-center'>
                <label htmlFor='onlineUsers' className='flex flex-row gap-2'>
                  <input
                    name='onlineUsers'
                    type='checkbox'
                    className='checkbox checkbox-md'
                    onChange={() => setShowOnlineUsers(!showOnlineUsers)}
                  />
                  <div className='md:flex flex-col md:flex-row md:gap-1 hidden'>Show online only <p className='text-gray-500'>({`${onlineUsers?.length-1} online`})</p></div>
                </label>
              </div>
            </div>
            <div className='h-fit overflow-auto'>
              {
                users && filteredUsers.map((user,index) => (
                  <div key={index} className='w-full flex flex-col gap-0.5 border-t border-t-accent/50' onClick={() => navigate(`/messages/${user?._id}`)}>
                    <div className='w-full relative flex flex-row items-center gap-2 justify-start cursor-pointer hover:bg-base-200 transition-all duration-200 p-2'>
                      <img src={user?.profilePic} alt='userImage' className='aspect-ratio object-cover rounded-full size-11'/>
                      <div className={`${onlineUsers.includes(user?._id) ? 'absolute top-3 border border-green-700 left-10 size-3 bg-green-500 rounded-full' : 'absolute'}`}></div>
                      <div className='flex flex-col w-fit'>
                        <p className='font-semibold truncate hidden md:block'>{user?.fullName}</p>
                        <p className={`hidden md:block ${onlineUsers.includes(user?._id) ? 'text-green-500' : 'text-gray-500'}`}>{onlineUsers.includes(user?._id) ? 'Online' : 'Offline'}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
              {
                filteredUsers?.length === 0 && (<p className='text-zinc-500 text-center text-lg'>No online users.</p>)
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default Sidebar