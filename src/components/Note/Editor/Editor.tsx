import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";

interface Props {
  background: string;
  content: string;
  onChange: (value: string) => void;
}

export default function Editor({ background, content, onChange }: Props) {
  const modules = {
    toolbar: {
      container: [
        [{ list: "ordered" }, { list: "bullet" }],
        [],
        ["bold", "italic", "underline", "strike"],
        [],
        [{ color: [] }, { background: [] }],
        [],
        ["link", "image"],
      ],
    },
  };

  return (
    <div className="editor" style={{ backgroundColor: background }}>
      <ReactQuill
        modules={modules}
        onChange={(value) => onChange(value)}
        value={content}
      ></ReactQuill>
    </div>
  );
}
