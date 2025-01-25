import { createSlice } from "@reduxjs/toolkit";

export interface CommonState {
  isLoading: boolean;
}

const initialState: CommonState = {
  isLoading: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
});

export default commonSlice.reducer;
