import { createSlice } from "@reduxjs/toolkit"
import { connectSocket, disconnectSocket } from "../utils/connectSocket";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading:false,
    socket:null,
    onlineUsers:[]
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setToken(state,value){
            state.token = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        },
        setConnectSocket(state,action){
            if(state.user === null){
                return;
            }
            else{
                connectSocket(action.asyncDispatch,action.getState);
            }
        },
        setDisconnectSocket(state,action){
            disconnectSocket(action.asyncDispatch,action.getState);
        },
        setSocket(state,value){
            state.socket = value.payload;
        }
    }
});

export const {setUser,setToken,setLoading,setSocket,setConnectSocket,setDisconnectSocket} = authSlice.actions;
export default authSlice.reducer;