import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </Provider>
)

export default store;
