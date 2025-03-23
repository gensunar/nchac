import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
        isLoggedIn: false,
        isLoading: true,
        user: {}
    },
    reducers: {
        teacherLogin: (state, action) => {
            state.teacher = action.payload.teacher,
            state.isLoggedIn = true,
            state.isLoading = false
        },
        teacherLogout: (state, action) => {
            state.user = null,
            state.isLoading = true,
            state.isLoggedIn = false;
        },
    }
})


export const { teacherLogin, teacherLogout } = teacherSlice.actions
export default teacherSlice.reducer