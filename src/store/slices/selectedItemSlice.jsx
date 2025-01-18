import { createSlice } from "@reduxjs/toolkit";

const selectedItemSlice = createSlice({
    name: "selectedItem",
    initialState: "About",
    reducers: {
        setSelectedItemSlice: (state, action) => {
            return action.payload
        }
    }
})


export const { setSelectedItemSlice } = selectedItemSlice.actions
export default selectedItemSlice.reducer