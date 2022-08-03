import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./auth.slice";
import themeSlice from "./theme.slice";

export * from './theme.slice';
export * from './auth.slice';


const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        auth: authSlice.reducer
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


