import React from "react";
import Content from "../Content/Content";
import { Note } from "../../../store/notes/note.type";
import "./List.css";

interface Props {
  notes: Note[];
  selected: string;
}

export default function List({ notes, selected }: Props) {
  return (
    <div className="list__notes">
      {notes.map((note) => (
        <Content key={note.id} value={note} selected={selected} />
      ))}
    </div>
  );
}
