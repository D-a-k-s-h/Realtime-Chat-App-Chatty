import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/AuthSlice'
import themeReducer from '../slices/themeSlice'
import usersReducer from '../slices/UsersSlice'
import messagesReducer from '../slices/messageSlice';

const rootReducer = combineReducers({
    auth:authReducer,
    theme:themeReducer,
    users:usersReducer,
    message:messagesReducer
});

export default rootReducer;