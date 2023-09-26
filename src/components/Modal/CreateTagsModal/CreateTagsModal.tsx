import React, { FormEvent, MouseEvent, useState } from "react";
import "./CreateTagsModal.css";
import "../Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import Tag from "./Tag";
import { closeTagCreateModal } from "../../../store/modal/modal.slice";
import { CiCircleRemove } from "react-icons/ci";
import { createTag } from "../../../store/tags/tags.slice";

export default function CreateTagsModal() {
  const tags = useSelector((state: RootState) => state.tagsSlice);
  const dispatch = useDispatch();

  const [tagName, setTagName] = useState("");

  const handleCloseModal = () => {
    dispatch(closeTagCreateModal());
  };

  const handleBackgroundClick = (e: MouseEvent<HTMLElement>) => {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.classList.contains("edit__background"))
      handleCloseModal();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  const handleSubmitTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createTag(tagName));
    setTagName("");
  };

  return (
    <div className="edit__background" onClick={handleBackgroundClick}>
      <div className="edit__tags">
        <CiCircleRemove className="edit__delete" onClick={handleCloseModal} />
        <p className="edit__title">Edit Tags</p>
        <form className="edit__tags__form" onSubmit={handleSubmitTag}>
          <input
            type="text"
            name="value"
            value={tagName}
            onChange={onChange}
            placeholder="new tag..."
          ></input>
        </form>
        {tags.map((tag) => (
          <Tag key={tag} value={tag} />
        ))}
      </div>
    </div>
  );
}
