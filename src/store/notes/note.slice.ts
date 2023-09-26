import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "./note.type";
import { v4 } from "uuid";
import dayjs from "dayjs";

const initialState: Note = {
  id: v4(),
  tag: [],
  priority: 1,
  background: "#ffffff",
  title: "",
  content: "",
  date: dayjs().format("DD/MM/YY h:mm A"),
  time: new Date().getTime(),
  pinned: false,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setActiveNote: (_, action: PayloadAction<Note>) => {
      return action.payload;
    },
  },
});

export const { setActiveNote } = noteSlice.actions;
export default noteSlice.reducer;
