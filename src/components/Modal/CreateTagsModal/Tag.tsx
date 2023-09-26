import React from "react";
import { CiEraser } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { removeTag } from "../../../store/tags/tags.slice";
import "./Tag.css";

interface Props {
  value: string;
}

export default function Tag({ value }: Props) {
  const dispatch = useDispatch();

  const handleDeleteTag = () => {
    dispatch(removeTag(value));
  };

  return (
    <div className="edit__tag">
      <p>{value}</p>
      <CiEraser
        className="edit__tag__delete"
        onClick={handleDeleteTag}
      ></CiEraser>
    </div>
  );
}
