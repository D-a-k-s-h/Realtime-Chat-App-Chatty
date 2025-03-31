import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messages:[],
}

const messageSlice = createSlice({
    name:"message",
    initialState:initialState,
    reducers:{
        setMessages(state,value){
            state.messages = value.payload;
        },
        updateMessages(state,action){
            state.messages.push(action.payload);
        }
    }
});

export const {setMessages,updateMessages} = messageSlice.actions;
export default messageSlice.reducer;