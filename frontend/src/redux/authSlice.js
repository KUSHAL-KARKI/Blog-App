import {createSlice} from "@reduxjs/toolkit";
const initialState ={
    authUser: localStorage.getItem("authUser") 
    ? JSON.parse(localStorage.getItem("authUser"))
    : null, 
    
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser= action.payload;
            localStorage.setItem("authUser",JSON.stringify(action.payload))
        },
        clearAuthUser:(state)=>{
            state.authUser= null;
            localStorage.removeItem("authUser")
        },
    },
});
export const {setAuthUser , clearAuthUser}= authSlice.actions;
export default  authSlice.reducer;