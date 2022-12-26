import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData } from "./../../interface/News.interface";
import { getNewsList } from "../../api/actions";

export interface newsState {
    loading: string;
    datas: IData[];
}

const initialState: newsState = {
    loading: "Loading",
    datas: [],
};

// redux-toolkit thunk 비동기 함수
const asyncNewsListFetch = createAsyncThunk("newsSlice/asyncNewsListFetch", getNewsList);

const newsSlice = createSlice({
    name: "newsSlice",
    initialState,
    // 동기
    reducers: {},

    // 비동기 - 비동기는 액션파일을 생성해주지 않는다
    extraReducers: (builder) => {
        builder.addCase(asyncNewsListFetch.pending, (state, action) => {
            state.loading = "Loading";
        });
        builder.addCase(asyncNewsListFetch.fulfilled, (state, action) => {
            state.loading = "Complete";
            state.datas = action.payload;
        });
        builder.addCase(asyncNewsListFetch.rejected, (state, action) => {
            state.loading = "Fail";
        });
    },
});

export { asyncNewsListFetch };
export default newsSlice.reducer;
