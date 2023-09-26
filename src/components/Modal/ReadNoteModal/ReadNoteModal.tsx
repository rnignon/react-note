import React, { MouseEvent } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { closeNoteReadModal } from "../../../store/modal/modal.slice";
import "./ReadNoteModal.css";
import { RootState } from "../../../store";

export default function ReadNoteModal() {
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) => state.noteSlice);

  const { title, content, background, tag, date } = note;

  const handleCloseModal = () => {
    dispatch(closeNoteReadModal());
  };

  const handleBackgroundClick = (e: MouseEvent<HTMLElement>) => {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.classList.contains("edit__background"))
      handleCloseModal();
  };
  return (
    <div className="edit__background" onClick={handleBackgroundClick}>
      <div className="edit__read__note">
        <CiCircleRemove className="edit__delete" onClick={handleCloseModal} />
        <p className="edit__title">{title}</p>
        <p className="edit__read__date">{date}</p>
        <div className="edit__read__tag-container">
          {tag.map((data) => (
            <div key={data} className="edit__read__tag">
              {data}
            </div>
          ))}
        </div>
        <div
          className="edit__read__content"
          dangerouslySetInnerHTML={{ __html: content }}
          style={{ backgroundColor: background }}
        ></div>
      </div>
    </div>
  );
}
