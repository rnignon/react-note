import React from "react";
import { Note } from "../../../store/notes/note.type";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import {
  PiPencilSimpleLineLight,
  PiArchiveTrayLight,
  PiTrash,
} from "react-icons/pi";
import { CiRedo } from "react-icons/ci";
import "./Content.css";
import { useDispatch } from "react-redux";
import { setEdit } from "../../../store/notes/noteState.slice";
import {
  openNoteEditModal,
  openNoteReadModal,
} from "../../../store/modal/modal.slice";
import { setActiveNote } from "../../../store/notes/note.slice";
import {
  createNote,
  pinNote,
  removeNote,
  unpinNote,
} from "../../../store/notes/notes.slice";
import { addTrash, restoreTrash } from "../../../store/trash/trash.slice";
import {
  addArchive,
  restoreArchive,
} from "../../../store/archive/archive.slice";
import { Reserved } from "../../../type";

interface Props {
  value: Note;
  selected: string;
}

export default function Content({ selected, value }: Props) {
  const { id, tag, priority, background, title, content, date, pinned } = value;
  const dispatch = useDispatch();

  const handleEditNote = () => {
    dispatch(openNoteEditModal());
    dispatch(setEdit(true));
    dispatch(setActiveNote(value));
  };

  const handleRemoveNote = () => {
    dispatch(removeNote(value));
    dispatch(addTrash(value));
  };

  const handleToArchive = () => {
    dispatch(removeNote(value));
    dispatch(addArchive(value));
  };

  const handleRestore = () => {
    if (selected === Reserved.ARCHIVE) {
      dispatch(restoreArchive(value));
      dispatch(createNote(value));
    } else if (selected === Reserved.TRASH) {
      dispatch(restoreTrash(value));
      dispatch(createNote(value));
    }
  };

  const handlePinNote = (bool: boolean) => {
    bool ? dispatch(pinNote(id)) : dispatch(unpinNote(id));
  };

  const handleReadNote = () => {
    dispatch(setActiveNote(value));
    dispatch(openNoteReadModal());
  };

  return (
    <div className="content__container" style={{ backgroundColor: background }}>
      <div className="content__header">
        <p className="content__title">{title}</p>
        {priority === 0 ? (
          <p className="content__priority">HIGH</p>
        ) : priority === 2 ? (
          <p className="content__priority">LOW</p>
        ) : (
          <p className="content__priority">MID</p>
        )}
        {pinned ? (
          <AiFillPushpin
            className="content__pinned__true"
            onClick={() => handlePinNote(false)}
          />
        ) : (
          <AiOutlinePushpin
            className="content__pinned__false"
            onClick={() => handlePinNote(true)}
          />
        )}
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="content__detail"
        onClick={handleReadNote}
      />
      <div className="content__tag">
        {tag.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>
      <div className="content__info">
        <div className="content__date">{date}</div>

        {selected === Reserved.ARCHIVE || selected === Reserved.TRASH ? (
          <div className="content__buttons">
            <button onClick={handleRestore}>
              <CiRedo className="content__button__restore" />
            </button>
          </div>
        ) : (
          <div className="content__buttons">
            <button onClick={handleEditNote}>
              <PiPencilSimpleLineLight className="content__button__edit" />
            </button>
            <button onClick={handleToArchive}>
              <PiArchiveTrayLight className="content__button__archive" />
            </button>
            <button onClick={handleRemoveNote}>
              <PiTrash className="content__button__delete" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
