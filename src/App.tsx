import React from "react";
import "./App.css";
import Nav from "./components/Sidebar/Nav/Nav";
import Main from "./components/Main";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import CreateTagsModal from "./components/Modal/CreateTagsModal/CreateTagsModal";
import CreateNoteModal from "./components/Modal/CreateNoteModal/CreateNoteModal";
import ReadNoteModal from "./components/Modal/ReadNoteModal/ReadNoteModal";

function App() {
  const modal = useSelector((state: RootState) => state.modalSlice);

  return (
    <div className="App">
      <Nav />
      <Main />
      {modal.tag_create && <CreateTagsModal />}
      {modal.note_edit && <CreateNoteModal />}
      {modal.note_read && <ReadNoteModal />}
    </div>
  );
}

export default App;
