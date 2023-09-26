import React from "react";

import { CiPen } from "react-icons/ci";

import "./Nav.css";
import Element from "./Element";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Reserved } from "../../../type";
import { openTagCreateModal } from "../../../store/modal/modal.slice";

export default function Nav() {
  const tags = useSelector((state: RootState) => state.tagsSlice);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(openTagCreateModal());
  };

  return (
    <nav className="nav">
      <h2> Keep </h2>
      <Element key={Reserved.NOTES} value={Reserved.NOTES} />

      {tags.map((tag) => (
        <Element key={tag} value={tag} />
      ))}

      <button className="nav__element" onClick={handleEdit}>
        <CiPen className="nav__icon" />
        <p className="nav__title">Edit Notes</p>
      </button>

      <Element key={Reserved.ARCHIVE} value={Reserved.ARCHIVE} />
      <Element key={Reserved.TRASH} value={Reserved.TRASH} />
    </nav>
  );
}
