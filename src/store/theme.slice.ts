
import { getItemAsBoolean, setItem } from "@/helper";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    dark: boolean;
}

const initialState: InitialState = {
    dark: getItemAsBoolean('dark'),
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.dark = !state.dark
            setItem('dark', state.dark.toString())
        }
    }
})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice;