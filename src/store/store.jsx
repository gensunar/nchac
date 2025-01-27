import { configureStore } from "@reduxjs/toolkit";
import selectedItemReducer from "./slices/selectedItemSlice"
import userReducer from "./slices/user" 

export const store = configureStore({
    reducer: {
        // Add reducers here
        selectedItem: selectedItemReducer,
        user: userReducer

    }
})