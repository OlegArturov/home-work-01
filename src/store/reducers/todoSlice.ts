import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../services/models/todo/todo";

export interface ITodoInitialState {
  todos: Array<ITask>;
}

const initialState: ITodoInitialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default todoSlice.reducer;
