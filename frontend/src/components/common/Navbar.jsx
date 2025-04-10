import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CiChat1 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { GoPerson } from "react-icons/go";
import { logout } from '../../services/operations/Auth';
import { FiLogOut } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";


const Navbar = () => {

  const {user} = useSelector((state) => state.auth);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible,setIsVisible] = useState(false);

  return (
    <div className='h-14 border-b grid'>
      {
        user && token ? (
          <div className='flex justify-between items-center px-2 md:pl-4 md:pr-6'>
            <div>
              <Link to={"/"} className='cursor-pointer'>
                <p className='flex items-center gap-2 font-bold'><button className=' p-2 rounded-md bg-base-300'><CiChat1 className='text-lg'/></button> Chatty</p>
              </Link>
            </div>
            <div className='relative group sm:hidden text-xl'>
              <div className='btn' onClick={() => setIsVisible(!isVisible)}><CiMenuKebab/></div>
              <ul className={`absolute opacity-0 right-2 top-10 z-[1000] bg-base-200 rounded-lg flex items-center gap-2 md:gap-4 menu invisible group-hover:visible group-hover:opacity-100`}>
                <li>
                  <Link to={"/settings"}>
                    <button type='button' className='flex items-center gap-2 btn btn-md'><IoSettingsOutline/> Settings</button>
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"}>
                    <button type='button' className='flex items-center gap-2 btn btn-md'><GoPerson/> Profile</button>
                  </Link>
                </li>
                <li>
                  <button type='button' onClick={() => dispatch(logout(navigate))} className='flex items-center btn btn-error'><FiLogOut/>Logout</button>
                </li>
              </ul>
            </div>
            <div className='hidden sm:block'>
              <ul className='flex items-center gap-2 md:gap-4'>
                <li>
                  <Link to={"/settings"}>
                    <button type='button' className='flex items-center gap-2 font-medium hover:bg-base-300 transition-all duration-200 rounded-md p-1 cursor-pointer'><IoSettingsOutline/> Settings</button>
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"}>
                    <button type='button' className='flex items-center gap-2 font-medium hover:bg-base-300 transition-all duration-200 rounded-md p-1 cursor-pointer'><GoPerson/> Profile</button>
                  </Link>
                </li>
                <li>
                  <button type='button' onClick={() => dispatch(logout(navigate))} className='flex items-center gap-2 font-medium hover:bg-base-300 transition-all duration-200 rounded-md p-1 cursor-pointer'><FiLogOut/>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className='flex justify-between items-center pr-4'>
            <div className='p-3'>
              <Link to={"/"} className='cursor-pointer'>
                <p className='flex items-center gap-2 font-bold'><button className='p-2 rounded-md bg-base-300'><CiChat1 className='text-lg'/></button> Chatty</p>
              </Link>
            </div>

            <div className='p-3'>
              <Link to={"/settings"}>
                <button type='button' className='flex items-center gap-2 font-medium hover:bg-base-300 transition-all duration-200 rounded-md p-1 cursor-pointer'><IoSettingsOutline/> Settings</button>
              </Link>
            </div>
          </div>
        ) 
      }
        
    </div>
  )
}

export default Navbar