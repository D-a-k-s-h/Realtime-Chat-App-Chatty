import React from 'react'
import { THEMES } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../slices/themeSlice';
import { IoPaperPlaneOutline } from "react-icons/io5";

const PREVIEW_MESSAGES = [
  {
    id:1,
    content:"Hey! How's it going",
    isSent:false
  },
  {
    id:2,
    content:"I'm doing great! Just working on some new features.",
    isSent:true
  }
];

const Settings = () => {

  const dispatch = useDispatch();
  const {theme} = useSelector((state) => state.theme);
  console.log("Themes -> ",THEMES);

  return (
    <div className='w-screen my-5 md:my-10 grid place-items-center'>
      <div className='sm:w-11/12 p-7 rounded-md'>
        <p className='text-lg font-semibold'>Theme</p>
        <p>Choose a theme for your chat interface</p>
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2'>
          {
            THEMES.map((t,index) => (
              <button key={index} onClick={() => dispatch(setTheme(t))} className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${theme == t ? 'bg-base-300' : 'hover:bg-base-200/50'}`}>
                <div className='relative h-8 w-full rounded-md overflow-hidden' data-theme={t}>
                  <div className='absolute inset-0 grid grid-cols-4 gap-1 p-1'>
                    <div className='rounded bg-primary'></div>
                    <div className='rounded bg-secondary'></div>
                    <div className='rounded bg-accent'></div>
                    <div className='rounded bg-neutral'></div>
                  </div>
                </div>
                <span className='text-[11px] font-medium truncate w-full text-center'>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
              </button>
            ))
          }
        </div>

        <div className='w-full'>
          {/* PREVIEW SECTION */}
          <p className='w-full text-lg font-semibold'>Preview</p>
          <div className='w-full bg-gray-200 p-5 rounded-xl border-base-300 shadow grid place-items-center'>
            <div className='sm:w-1/3 shadow bg-base-100 rounded-md'>
              <div className='flex p-2 flex-row items-center gap-2'>
                <p className='bg-primary size-10 text-center text-primary-content p-2 rounded-full aspect-square font-bold'>J</p>
                <div className='flex flex-col'>
                  <p>John Doe</p>
                  <p className='text-sm text-gray-500'>Online</p>
                </div>
              </div>
              <hr className='text-base-300'/>
              <div>
                <div className='p-4 w-fit flex flex-col chat'>
                  {
                    PREVIEW_MESSAGES.map((mess) => (
                      <div key={mess?.id} className={`p-3 rounded-xl ${mess?.isSent ? 'chat-end' : 'chat-start'}`}>
                        <p className='chat-bubble rounded-lg'>{mess?.content}</p>
                        <p className='text-xs text-base-content/70'>12:00pm</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <hr className='text-base-300'/>
              <div className='w-full'>
                <div className='w-full p-2 flex flex-row gap-2'>
                  <input
                    type='text'
                    readOnly
                    value={"This is a preview"}
                    className='w-full border border-base-300 p-2 rounded-xl'
                  />
                  <button className='btn btn-primary p-3 rounded-2xl cursor-pointer text-primary-content text-xl'><IoPaperPlaneOutline/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings