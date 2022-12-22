import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData } from "../../interface/Post.interface";

export type PostState = IData[];
const initialState: PostState = [];

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<IData>) => {
            state.push({ ...action.payload });
        },
    },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
