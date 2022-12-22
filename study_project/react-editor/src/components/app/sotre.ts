import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../../features/post/postSlice";

export const store = configureStore({
    reducer: {
        post: postReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
