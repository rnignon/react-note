import React, { MouseEvent } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { closeTagAddModal } from "../../../store/modal/modal.slice";
import "./AddTagModal.css";
import { RootState } from "../../../store";

interface Props {
  tags: string[];
  onChange: (value: string[]) => void;
}

export default function AddTagModal({ tags, onChange }: Props) {
  const dispatch = useDispatch();
  const tag_list = useSelector((state: RootState) => state.tagsSlice);

  const handleCloseModal = () => {
    dispatch(closeTagAddModal());
  };

  const handleBackgroundClick = (e: MouseEvent<HTMLElement>) => {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.classList.contains("edit__background"))
      handleCloseModal();
  };

  const handleAddTag = (value: string) => {
    if (!tags.includes(value)) {
      onChange([...tags, value]);
    }
  };

  const handleRemoveTag = (value: string) => {
    if (tags.includes(value)) {
      onChange(tags.filter((data) => data !== value));
    }
  };

  return (
    <div className="edit__tag__background" onClick={handleBackgroundClick}>
      <div className="edit__add__tags">
        <CiCircleRemove className="edit__delete" onClick={handleCloseModal} />
        <p className="edit__title">태그 추가하기</p>
        <div className="edit__add__tag__list">
          {tag_list.map((value) => (
            <div key={value} className="edit__tag">
              <p>{value}</p>
              {tags.includes(value) ? (
                <button onClick={() => handleRemoveTag(value)}>-</button>
              ) : (
                <button onClick={() => handleAddTag(value)}>+</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
