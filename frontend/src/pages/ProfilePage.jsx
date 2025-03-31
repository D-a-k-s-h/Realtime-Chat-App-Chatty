import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoPerson } from 'react-icons/go';
import { CiMail } from "react-icons/ci";
import { MdOutlineCameraAlt } from "react-icons/md";
import { updateProfilePic } from '../services/operations/profileAPI';
import { CiUndo } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import { Loader } from 'lucide-react';
import { formatDate } from '../utils/formatDate';


const ProfilePage = () => {

  const {user} = useSelector((state) => state.auth);
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [previewSource,setPreviewSource] = useState(null);
  const dispatch = useDispatch();
  const [image,setImage] = useState(null);

  console.log("USER -> ",user);

  const updatePicture = async() => {
    setLoading(true);
    setPreviewSource(null);
    const formData = new FormData();
    formData.append("profileImage",image);
    await dispatch(updateProfilePic(formData,token));   
    setLoading(false);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  function handlePreview(e){
    const file = e.target.files[0];
    console.log("FILE -> ",file);
    if(file){
      previewFile(file);
      setImage(file);
    }
  }

  return (
    <div className='w-screen h-screen my-4 flex flex-col gap-4 items-center justify-center'>
      <div className='sm:w-4/12 bg-base-300/70 flex flex-col gap-5 items-center justify-center rounded-lg px-5 py-4'>
        <div className='w-full flex flex-col gap-2 justify-center items-center'>
          <p className='text-2xl font-semibold'>Profile</p>
          <p>Your profile information</p>
        </div>
        <div className='w-full relative flex flex-col gap-3 items-center justify-center'>
          <img className='aspect-square rounded-full border-2 w-36 object-cover' src={previewSource || user?.profilePic} alt='userImage'/>
          <p>{loading ? 'Loading...' : 'Click the camera icon to update your photo'}</p>
          <label htmlFor='profileImage'>
            <input
              name='profileImage'
              id='profileImage'
              type='file'
              accept='image/jpeg, image/png, image/webp, image/jpg'
              className='hidden'
              onChange={handlePreview}
            />
            <p className={!loading ? 'absolute p-3 btn btn-primary top-25 right-40 rounded-full text-xl cursor-pointer' : 'hidden'}>{previewSource ? <CiUndo onClick={() => setPreviewSource(null)}/> : <MdOutlineCameraAlt/>}</p>
          </label>
          <p className={previewSource ? 'absolute p-3 btn btn-primary top-25 right-24 cursor-pointer rounded-full text-xl opacity-0 animate-slide-in' : 'hidden'} onClick={updatePicture}><FiUpload/></p>
        </div>
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <div className='w-full relative flex flex-col'>
            <label htmlFor='fullName' className='pl-5'>Full Name</label>
            <input
              name='fullName'
              type='text'
              readOnly
              className='p-2 border rounded-md'
              value={user?.fullName}
            />
            <p className='absolute top-1'><GoPerson/></p>
          </div>
          <div className='w-full relative flex flex-col'>
            <label htmlFor='email' className='pl-5'>Email</label>
            <input
              name='email'
              type='email'
              className='p-2 border rounded-md'
              readOnly
              value={user?.email}
            />
            <p className='absolute top-[0.35rem]'><CiMail/></p>
          </div>
        </div>
      </div>
      <div className='sm:w-4/12 bg-base-300/70 flex flex-col gap-5 items-start justify-center rounded-lg px-5 py-4'>
        <p className='font-semibold text-lg'>Account information</p>
        <div className='w-full flex flex-col'>
          <div className='w-full flex flex-row gap-10 md:gap-20 justify-between border-b pb-3'>
            <p className='font-semibold'>Member Since</p>
            <p>{formatDate(user?.createdAt)}</p>
          </div>
          <div className='w-full flex justify-between pt-2'>
            <p className='font-semibold'>Account Status</p>
            <p className='text-green-500'>Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage