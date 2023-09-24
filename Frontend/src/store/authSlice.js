import { createSlice } from "@reduxjs/toolkit";

const initialState={user:null}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload,
            localStorage.setItem("user-hunger",JSON.stringify(action.payload));
        },
        logout:(state,action)=>{
            state.user=action.payload,
            localStorage.removeItem("user-hunger")
        }
    }
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer