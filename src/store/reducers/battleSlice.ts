import { createSlice } from "@reduxjs/toolkit";

export interface IBattleInitialState {
  isLoading: boolean;
}

const initialState: IBattleInitialState = {
  isLoading: false,
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default battleSlice.reducer;
