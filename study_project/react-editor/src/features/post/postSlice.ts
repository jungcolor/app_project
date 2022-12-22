import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData } from "../../interface/Post.interface";

export interface PostState {
    post: IData[];
}

const initialState: PostState = {
    post: [],
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        test: (state, action: PayloadAction<IData>) => {
            console.log(action);
            console.log(action.payload);
        },
    },
});

export const { test } = postSlice.actions;
export default postSlice.reducer;
