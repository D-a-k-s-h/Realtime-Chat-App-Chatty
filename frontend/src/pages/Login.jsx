import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiChat1, CiLock } from 'react-icons/ci'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/operations/Auth';
import { setLoading } from '../slices/AuthSlice';
import { Loader } from 'lucide-react';
import Design from '../components/common/Design';

const Login = () => {

  const dispatch = useDispatch();
  const [passwordVisibility,setPasswordVisibility] = useState(false);
  const navigate = useNavigate();
  const {loading} = useSelector((state) => state.auth);
  const [buttonLoading,setButtonLoading] = useState(false);

  const isVisible = () => {
    setPasswordVisibility(!passwordVisibility);
  }

  const{
    register,
    formState:{errors},
    handleSubmit
  } = useForm();

  const submitHandler = async(data) => {
    setButtonLoading(true);
    setLoading(true);
    //console.log("LOGIN DATA -> ",data);

    const formData = new FormData();

    formData.append('email',data.email);
    formData.append('password',data.password);

    await dispatch(login(formData,navigate));
    setLoading(false);
    setButtonLoading(false);
  }

  return (
    <>
      {
        loading ? (
          <div className='w-screen flex items-center justify-center h-screen'>
            <Loader className='size-10 animate-spin'/>
          </div>
        ) : (
          <div className='w-screen h-screen flex flex-row items-center justify-around'>
            {/* LOGIN PART */}
            <div className='w-full md:w-[60%] flex flex-col gap-4 p-4 md:p-28'>
              <div className='flex flex-col justify-center items-center'> 
                <p className='w-fit p-2 rounded-md text-xl bg-base-300'><CiChat1/></p>
                <p className='font-bold text-2xl'>Welcome Back!</p>
                <p>Sign in to your account</p>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className='flex flex-col'>
                  <label htmlFor='email'>Email<sup className='text-error'>*</sup></label>
                  <input
                    name='Email'
                    type='email'
                    placeholder='Enter your email'
                    {...register('email',{required:true})}
                    className='p-2 border rounded-md pl-10 relative'
                  />
                  <p className='w-fit relative -top-7 left-3'><GoPerson/></p>
                  {
                    errors.email && (
                      <p className='text-error'>Please provide email address</p>
                    )
                  }
                </div>

                <div className='relative flex flex-col'>
                  <label htmlFor='password'>Password<sup className='text-red-600'>*</sup></label>
                  <input
                    name='password'
                    type={passwordVisibility ? 'text' : 'password'}
                    placeholder='Enter password'
                    className='p-2 border rounded-md pl-10 relative'
                    {...register('password',{required:true})}
                  />
                  <p className='w-fit relative -top-7 left-3'><CiLock/></p>
                  <p className='absolute top-9.5 right-3 cursor-pointer' onClick={isVisible}>{passwordVisibility ? <FaRegEyeSlash/> : <FaRegEye/>}</p>
                  {
                    errors.password && (
                      <p className='text-red-600'>Please provide password</p>
                    )
                  }
                </div>

                <button type='submit' disabled={buttonLoading} className='w-full btn btn-primary p-2 rounded-md font-semibold cursor-pointer'>{buttonLoading ? 'Loading...' : 'Login'}</button>
                <p className='text-center mt-4'>Don't have an account? <Link to={"/signup"} className='underline'>Create account</Link></p>
              </form>
            </div>

            {/* DESIGN PART */}
            <div className='w-full h-full bg-base-200 hidden sm:flex flex-col gap-3 justify-center items-center p-3'>
              <Design/>
              <p className='text-2xl font-semibold'>Welcome Back!</p>
              <p className='text-sm text-center w-[45%]'>Login to continue your conversations and catch up with your messages</p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Login