import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User"
import cartReducer from "../features/Cart";
import modalsReducer from '../features/Modals'
export const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
        modals: modalsReducer,
    }
});