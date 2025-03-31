import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    onlineUsers:[],
    userDetails: null
}

const usersSlice = createSlice({
    name:"users",
    initialState:initialState,
    reducers:{
        setOnlineUsers(state,value){
            state.onlineUsers = value.payload;
        },
        setUsersDetails(state,value){
            state.userDetails = value.payload;
        }
    }
});

export const{setOnlineUsers,setUsersDetails} = usersSlice.actions;
export default usersSlice.reducer;