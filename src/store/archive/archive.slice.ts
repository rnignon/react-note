import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "../notes/note.type";

const initialState: Note[] = [];

export const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    addArchive: (state, action: PayloadAction<Note>) => {
      return [...state, action.payload];
    },
    restoreArchive: (state, action) => {
      return state.filter((note) => note.id !== action.payload.id);
    },
  },
});

export const { addArchive, restoreArchive } = archiveSlice.actions;
export default archiveSlice.reducer;
