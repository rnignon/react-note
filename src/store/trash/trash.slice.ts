import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "../notes/note.type";

const initialState: Note[] = [];

export const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
    addTrash: (state, action: PayloadAction<Note>) => {
      return [...state, action.payload];
    },
    restoreTrash: (state, action) => {
      return state.filter((note) => note.id !== action.payload.id);
    },
    deleteTrash: (state) => {
      return initialState;
    },
  },
});

export const { addTrash, restoreTrash, deleteTrash } = trashSlice.actions;
export default trashSlice.reducer;
