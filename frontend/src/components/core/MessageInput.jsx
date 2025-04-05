import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { SlPicture } from "react-icons/sl";
import { RiSendPlaneLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { getMessages, sendMessages } from '../../services/operations/messageAPI';
import { useLocation } from 'react-router-dom';
import { setMessages, updateMessages } from '../../slices/messageSlice';

const MessageInput = () => {

  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const receiverId = location.pathname.split("/").at(-1);
  const [previewSource,setPreviewSource] = useState(null);
  const [image,setImage] = useState(null);
  const [textInput,setTextInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue
  } = useForm();

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

  function removePreviewSource(){
    setPreviewSource(null);
    setImage(null);
  }

  const trackTextInput = (e) => {
    e.preventDefault();
    setTextInput(e.target.value);
  }

  const submitHandler = async(data) => {
    //console.log("SEND MESSAGE DATA -> ",data);
    const formData = new FormData();

    formData.append("text",data.text);
    if(image){
      formData.append("image",image);
    }

    await dispatch(sendMessages(receiverId,formData,token));
    // const response = await dispatch(getMessages(receiverId,token));
    // console.log("New Messages -> ",response);
    // dispatch(setMessages(response));
    
    setPreviewSource(null);
    setImage(null);
    setValue("text","");
  }

  return (
    <div className='w-full p-2 border border-accent/50 rounded-br-lg'>
      {
        previewSource && (
          <div className='relative pb-3'>
            <img src={previewSource} alt='previewImage' className='size-35 rounded-md object-fill border border-accent/20'/>
            <p className='absolute top-0 left-32 bg-primary rounded-full size-4.5 grid place-items-center text-neutral cursor-pointer' onClick={removePreviewSource}><RxCross2/></p>
          </div>
        )
      }
      <form onSubmit={handleSubmit(submitHandler)} className='w-full flex flex-row items-center gap-4'>
        <div className='w-full'>
          <input
            name='text'
            type='text'
            placeholder='Type a message...'
            className='input input-bordered w-full rounded-md'
            {...register("text")}
            onInput={trackTextInput}
          />
        </div>
        <div>
          <label htmlFor='image' className='cursor-pointer'>
            <input
              type='file'
              name='image'
              id='image'
              accept='image/jpeg, image/png, image/webp, image/jpg'
              className='hidden'
              onChange={handlePreview}
            />
            <SlPicture className='btn btn-block size-8 p-0 sm:px-1 rounded-md'/>
          </label>
        </div>
        <button type='submit' disabled={!image && !textInput} className='btn btn-secondary btn-circle aspect-square'><RiSendPlaneLine className='size-5'/></button>
      </form>
    </div>
  )
}

export default MessageInput