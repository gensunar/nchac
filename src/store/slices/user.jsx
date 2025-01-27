import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        email: null,
        displayName: null,
        uid: null,
        isLoading: true
    },
    reducers: {
        register: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true,
            state.email = action.payload.email,
            state.displayName = action.payload.name,
            state.uid= action.payload.uid
            state.isLoading= false
        }, 
        logout : (state, action) => {
            state.isLoggedIn = false;
            state.email = null;
            state.displayName = null;
            state.uid = null;
            state.user = null;
            state.isLoading = true;
        }
    }
})

export const {register, logout} =userSlice.actions 
export default userSlice.reducer