import { configureStore } from "@reduxjs/toolkit";
import selectedItemReducer from "./slices/selectedItemSlice"
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

//user Reducer
import userReducer from "./slices/user"
import themeReducer from "./slices/themeSlice";
import teacherReducer from "./slices/teacherSlice"


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        // Add reducers here
        selectedItem: selectedItemReducer,
        user: persistedReducer,
        theme: themeReducer,
        teacher: teacherReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for Redux Persist
        }),
})

export const persistor = persistStore(store);