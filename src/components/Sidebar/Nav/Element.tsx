import React from "react";
import {
  CiStickyNote,
  CiShoppingTag,
  CiInboxIn,
  CiTrash,
} from "react-icons/ci";

import { useDispatch } from "react-redux";
import { setActiveTag } from "../../../store/tags/tag.slice";
import { Reserved } from "../../../type";
import "./Element.css";

interface Props {
  value: string;
}

export default function Element({ value }: Props) {
  const dispatch = useDispatch();
  const activeTag = (value: string) => {
    dispatch(setActiveTag(value));
  };

  return (
    <button className="nav__element" onClick={() => activeTag(value)}>
      {value === Reserved.NOTES ? (
        <CiStickyNote className="nav__icon" />
      ) : value === Reserved.ARCHIVE ? (
        <CiInboxIn className="nav__icon" />
      ) : value === Reserved.TRASH ? (
        <CiTrash className="nav__icon" />
      ) : (
        <CiShoppingTag className="nav__icon" />
      )}
      <p className="nav__title">{value}</p>
    </button>
  );
}
