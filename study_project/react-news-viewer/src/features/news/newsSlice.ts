import { IData } from "./../../interface/News.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type newsState = IData[];
const initialState: newsState = [];

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        test: (state, action: PayloadAction<IData>) => {},
    },
});

export const { test } = newsSlice.actions;
export default newsSlice.reducer;
