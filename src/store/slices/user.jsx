import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        isLoading: true,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.isLoggedIn = true,
            state.uid= action.payload.uid
            state.isLoading= false
        }, 
        logout : (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = true;
        }
    }
})

export const {login, logout} =userSlice.actions 
export default userSlice.reducer