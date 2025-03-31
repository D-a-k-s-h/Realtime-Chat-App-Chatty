import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import ProfilePage from './pages/ProfilePage'
import Error from './pages/Error'
import WelcomePage from './components/core/WelcomePage'
import ChatContainer from './components/core/ChatContainer'
import { connectSocket } from './utils/connectSocket'

const App = () => {

  const {user} = useSelector((state) => state.auth);
  const {theme} = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user){
      dispatch((dispatch,getState) => connectSocket(dispatch,getState));
    }
  },[dispatch,user]);

  return (
    <div className='w-screen min-h-screen flex flex-col' data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path='/login' element={!user ? <Login/> : <Navigate to={"/"}/>}/>
        <Route path='/signup' element={!user ? <SignUp/> : <Navigate to={"/"}/>}/>
        <Route path='/profile' element={user ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='*' element={<Error/>}/>

        <Route element={user ? <Home/> : <Navigate to={"/login"}/>}>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/messages/:id' element={<ChatContainer/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
