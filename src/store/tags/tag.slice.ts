import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: string = "Notes";

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setActiveTag: (_, action: PayloadAction<string>) => action.payload,
  },
});

export const { setActiveTag } = tagSlice.actions;
export default tagSlice.reducer;
