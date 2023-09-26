import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const noteStateSlice = createSlice({
  name: "noteState",
  initialState,
  reducers: {
    setEdit: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEdit } = noteStateSlice.actions;
export default noteStateSlice.reducer;
