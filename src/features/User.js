import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isUserLoggedIn: false,
    user:{},
    favorites:[]
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isUserLoggedIn = true
            state.user= action.payload
        },
        logout:(state)=>{
            state.isUserLoggedIn = false
            state.user = {}
        },
        manageFavorite:(state,action)=>{
            console.log(action.payload,"FAVS PAY")
            state.favorites = action.payload
        }
    }
});

export default userSlice.reducer
export const {login,logout,manageFavorite}  = userSlice.actions