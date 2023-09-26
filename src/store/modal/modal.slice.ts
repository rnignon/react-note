import { createSlice } from "@reduxjs/toolkit";
import { Modal } from "./modal.type";

const initialState: Modal = {
  tag_create: false,
  tag_add: false,
  note_edit: false,
  note_read: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openTagCreateModal: (state) => {
      if (
        !state.tag_create &&
        !state.tag_add &&
        !state.note_edit &&
        !state.note_read
      ) {
        return {
          ...state,
          tag_create: true,
        };
      }
      return state;
    },

    openTagAddModal: (state) => {
      if (
        !state.tag_create &&
        !state.tag_add &&
        state.note_edit &&
        !state.note_read
      ) {
        return {
          ...state,
          tag_add: true,
        };
      }
      return state;
    },

    openNoteEditModal: (state) => {
      if (
        !state.tag_create &&
        !state.tag_add &&
        !state.note_edit &&
        !state.note_read
      ) {
        return {
          ...state,
          note_edit: true,
        };
      }
      return state;
    },

    openNoteReadModal: (state) => {
      if (
        !state.tag_create &&
        !state.tag_add &&
        !state.note_edit &&
        !state.note_read
      ) {
        return {
          ...state,
          note_read: true,
        };
      }
      return state;
    },

    closeTagCreateModal: (state) => {
      if (state.tag_create) {
        return {
          ...state,
          tag_create: false,
        };
      }
      return state;
    },

    closeTagAddModal: (state) => {
      if (state.tag_add) {
        return {
          ...state,
          tag_add: false,
        };
      }
      return state;
    },

    closeNoteEditModal: (state) => {
      if (state.note_edit) {
        return {
          ...state,
          note_edit: false,
        };
      }
      return state;
    },

    closeNoteReadModal: (state) => {
      if (state.note_read) {
        return {
          ...state,
          note_read: false,
        };
      }
      return state;
    },
  },
});

export const {
  openTagCreateModal,
  openTagAddModal,
  openNoteEditModal,
  openNoteReadModal,
  closeTagCreateModal,
  closeTagAddModal,
  closeNoteEditModal,
  closeNoteReadModal,
} = modalSlice.actions;
export default modalSlice.reducer;
