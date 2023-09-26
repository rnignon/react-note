import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Note } from "../../../store/notes/note.type";
import {
  closeNoteEditModal,
  openTagAddModal,
} from "../../../store/modal/modal.slice";
import { createNote, editNote } from "../../../store/notes/notes.slice";
import { setEdit } from "../../../store/notes/noteState.slice";
import { CiCircleRemove } from "react-icons/ci";
import Editor from "../../Note/Editor/Editor";
import { RootState } from "../../../store";
import AddTagModal from "./AddTagModal";
import dayjs from "dayjs";
import { v4 } from "uuid";

import "./CreateNoteModal.css";

export default function EditNote() {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modalSlice);
  const isEdit = useSelector((state: RootState) => state.noteStateSlice);
  const activeNote = useSelector((state: RootState) => state.noteSlice);

  const [title, setTitle] = useState(isEdit ? activeNote.title : "");

  const [tags, setTags] = useState<string[]>(isEdit ? activeNote.tag : []);
  const [background, setBackground] = useState(
    isEdit ? activeNote.background : ""
  );

  let initial_priority;
  if (isEdit) {
    initial_priority =
      activeNote.priority === 0
        ? "HIGH"
        : activeNote.priority === 2
        ? "LOW"
        : "MID";
  } else initial_priority = "MID";

  const [priority, setPriority] = useState(initial_priority);
  const [content, setContent] = useState(isEdit ? activeNote.content : "");

  const handleCloseModal = () => {
    if (isEdit) dispatch(setEdit(false));
    dispatch(closeNoteEditModal());
  };

  const handleBackgroundClick = (e: MouseEvent<HTMLElement>) => {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.classList.contains("edit__background"))
      handleCloseModal();
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChange = (value: string) => {
    setContent(value);
  };

  const onTagsChange = (value: string[]) => {
    setTags(value);
  };

  const handleSubmitNote = () => {
    if (title === "") alert("노트 제목이 비었습니다.");
    else if (content === "") alert("노트 내용이 비었습니다.");
    else {
      const date = dayjs().format("DD/MM/YY h:mm a");
      const id = v4();

      let priority_num;
      switch (priority) {
        case "HIGH":
          priority_num = 0;
          break;
        case "MID":
          priority_num = 1;
          break;
        case "LOW":
          priority_num = 2;
          break;
        default:
          priority_num = 2;
      }

      let note: Partial<Note> = {
        tag: tags,
        priority: priority_num,
        background: background,
        title: title,
        content: content,
      };

      if (isEdit) {
        note = { ...activeNote, ...note };
        dispatch(editNote(note));
        dispatch(setEdit(false));
      } else {
        note = {
          ...note,
          date: date,
          id: id,
          time: new Date().getTime(),
          pinned: false,
        };
        dispatch(createNote(note));
      }
      dispatch(closeNoteEditModal());
    }
  };

  return (
    <div className="edit__background" onClick={handleBackgroundClick}>
      <div className="edit__note">
        <CiCircleRemove className="edit__delete" onClick={handleCloseModal} />
        <p className="edit__title">노트 생성하기</p>
        <form className="edit__note__form">
          <input
            type="text"
            name="title"
            value={title}
            onChange={onTitleChange}
            placeholder="노트 제목"
          ></input>
        </form>
        <Editor
          background={background}
          content={content}
          onChange={onContentChange}
        />
        <div className="edit__note__option">
          <button
            className="edit__note__addTag"
            onClick={() => dispatch(openTagAddModal())}
          >
            Add Tag
          </button>
          <div className="edit__note__tag">
            <label htmlFor="color">배경색 : </label>
            <select
              value={background}
              id="color"
              onChange={(e) => setBackground(e.target.value)}
            >
              <option value="#ffffff">White</option>
              <option value="#ffd1d1">Red</option>
              <option value="#ebffce">Green</option>
              <option value="#d5f1fc">Blue</option>
            </select>
          </div>
          <div className="edit__note__priority">
            <label htmlFor="priority">우선순위 : </label>
            <select
              value={priority}
              id="priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="HIGH">High</option>
              <option value="MID">Mid</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>

        <button className="edit__note__submit" onClick={handleSubmitNote}>
          + 생성하기
        </button>
      </div>
      {modal.tag_add && <AddTagModal tags={tags} onChange={onTagsChange} />}
    </div>
  );
}
