import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];
const reserved = ["notes", "Notes", "trash", "Trash", "Archive", "archive"];

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    createTag: (state, action) => {
      if (state.includes(action.payload) || reserved.includes(action.payload))
        return state;
      else return [...state, action.payload];
    },
    removeTag: (state, action) => {
      if (state.includes(action.payload))
        return state.filter((tag) => tag !== action.payload);
      else return state;
    },
  },
});

export const { createTag, removeTag } = tagsSlice.actions;
export default tagsSlice.reducer;
