import { setSocket } from "../slices/AuthSlice";
import { setOnlineUsers } from "../slices/UsersSlice";
import { io } from "socket.io-client";

const BASE_URL = "https://realtime-chat-app-chatty-li7x.onrender.com/";

export const connectSocket = (dispatch,getState) => {
    const {user} = getState().auth;

    if(!user){
        console.log("User not logged in.");
        return;
    }

    console.log("Connecting to socket at -> ",BASE_URL);
    const socket = io(BASE_URL,{
        query:{
            userId:user?._id
        }
    });

    socket.on("connect",() => {
        console.log("Socket connected: ",socket.id);
    })
    
    socket.on("getOnlineUsers",(userIds) => {
        console.log(userIds);
        dispatch(setOnlineUsers(userIds));
    })

    socket.on("disconnect",() => {
        console.log("Socket disconnected")
    })

    dispatch(setSocket(socket));
}

export const disconnectSocket = (dispatch,getState) => {
    const {socket} = getState().auth;

    if(socket?.connected){
        socket.disconnect();
    }

    dispatch(setSocket(null));
}