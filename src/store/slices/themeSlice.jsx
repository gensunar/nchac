import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        darkMode: false
    },
    reducers: {
        toogleTheme: (state) => {
            state.darkMode = !state.darkMode
        },
        setTheme: (state, action) => {
            state.darkMode = action.payload
        }
    }
})

export const {toogleTheme, setTheme} = themeSlice.actions
export default themeSlice.reducer