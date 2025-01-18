import { configureStore } from "@reduxjs/toolkit";
import selectedItemReducer from "./slices/selectedItemSlice"

export const store = configureStore({
    reducer: {
        // Add reducers here
        selectedItem: selectedItemReducer
    }
})