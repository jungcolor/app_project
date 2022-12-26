import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import newsReducer from "../features/news/newsSlice";

export const store = configureStore({
    reducer: {
        news: newsReducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
