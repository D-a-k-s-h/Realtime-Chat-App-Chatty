import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CiChat1 } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../services/operations/Auth';
import { Loader } from 'lucide-react';
import { setLoading } from '../slices/AuthSlice';
import Design from '../components/common/Design';


const SignUp = () => {
  
  const {loading} = useSelector((state) => state.auth);
  const [isVisiblePassword,setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword,setIsVisibleConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonLoading,setButtonLoading] = useState(false);

  const setPasswordVisibility = () => {
    setIsVisiblePassword(!isVisiblePassword);
  }

  const setConfirmPasswordVisibility = () => {
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
  }

  const{
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const submitHandler = async(data) => {
    setButtonLoading(true);
    setLoading(true);
    console.log("DATA -> ",data);

    const formData = new FormData();

    formData.append("fullName",data.fullName);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("confirmPassword",data.confirmPassword);

    await dispatch(signUp(formData,navigate));
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
          <div className='w-full h-screen flex flex-row items-center justify-around'>
            {/*SIGN UP PART*/}
            <div className='w-full md:w-[60%] flex flex-col gap-7 items-center justify-center p-2 md:p-24'>
              <div className='w-full flex flex-col justify-center items-center'> 
                <p className='w-fit p-2 rounded-md text-xl bg-base-300'><CiChat1/></p>
                <p className='font-bold text-2xl'>Create Account</p>
                <p>Get started with your free account</p>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className='flex flex-col'>
                  <label htmlFor='fullName'>Full Name<sup className='text-error'>*</sup></label>
                  <input 
                    name='fullName'
                    type='text'
                    placeholder='Enter your full name'
                    className='p-2 border rounded-md pl-10'
                    {...register("fullName",{required:true})}
                  />
                  <p className='w-fit relative -top-7 left-3'><GoPerson/></p>
                  {
                    errors.fullName && (
                      <p className='text-error'>Please enter full name</p>
                    )
                  }
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='email'>Email<sup className='text-error'>*</sup></label>
                  <input
                    name='email'
                    type='email'
                    placeholder='Enter your email address'
                    className='p-2 border rounded-md pl-10'
                    {...register("email",{required:true})}
                  />
                  <p className='w-fit relative -top-7 left-3'><CiMail/></p>
                  {
                    errors.email && (
                      <div className='text-error'>Please enter your email address</div>
                    )
                  }
                </div>

                <div className='w-fit flex flex-col sm:flex-row sm:gap-3'>
                  <div className='flex flex-col relative'>
                    <label htmlFor='password'>Password<sup className='text-error'>*</sup></label>
                    <input
                      name='password'
                      type={isVisiblePassword ? 'text' : 'password'}
                      placeholder='Enter password'
                      className='p-2 border rounded-md pl-10'
                      {...register("password",{required:true})}
                    />
                    <p className='w-fit relative -top-7 left-3'><CiLock/></p>
                    <p className='absolute top-9.5 right-3 cursor-pointer' onClick={setPasswordVisibility}>{isVisiblePassword ? <FaRegEyeSlash/> : <FaRegEye/>}</p>
                    {
                      errors.pasword && (
                        <p className='text-red-600'>Please enter password</p>
                      )
                    }
                  </div>

                  <div className='flex flex-col relative'>
                    <label htmlFor='confirmPassword'>Confirm Password<sup className='text-error'>*</sup></label>
                    <input
                      name='confirmPassword'
                      type={isVisibleConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm password'
                      className='p-2 border rounded-md pl-10'
                      {...register("confirmPassword",{required:true})}
                    />
                    <p className='w-fit relative -top-7 left-3'><CiLock/></p>
                    <p className='absolute top-9.5 right-3 cursor-pointer' onClick={setConfirmPasswordVisibility}>{isVisibleConfirmPassword ? <FaRegEyeSlash/> : <FaRegEye/>}</p>
                    {
                      errors.confirmPassword && (
                        <p className='text-error'>Please enter confirm password</p>
                      )
                    }
                  </div>
                </div>

                <button type='submit' disabled={buttonLoading} className='w-full btn btn-primary rounded-md p-2 font-semibold cursor-pointer'>{buttonLoading ? 'Loading...' : 'Create Account'}</button>
                <p className='text-center mt-4'>Already have an account? <Link to={"/login"} className='underline'>Login</Link></p>
              </form>
            </div>
            
            {/*DESIGN PART*/}
            <div className='w-full h-full bg-base-200 hidden md:flex flex-col gap-3 justify-center items-center'>
              <Design/>
              <p className='text-lg font-bold'>Join Our Community</p>
              <p className='md:w-[45%] text-center text-sm'>Connect with friends, share moments, and stay in touch with your loved ones</p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default SignUp