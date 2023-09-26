import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { CiSquarePlus } from "react-icons/ci";
import { openNoteEditModal } from "../store/modal/modal.slice";
import List from "./Note/List/List";
import { Note } from "../store/notes/note.type";

import "./Main.css";
import { Reserved } from "../type";
import { deleteTrash } from "../store/trash/trash.slice";
import SortModal from "./Modal/SortModal/SortModal";

export default function Main() {
  const dispatch = useDispatch();
  const original_notes = useSelector((state: RootState) => state.notesSlice);
  const archive = useSelector((state: RootState) => state.archiveSlice);
  const trash = useSelector((state: RootState) => state.trashSlice);

  const selected = useSelector((state: RootState) => state.tagSlice);
  const [empty, setEmpty] = useState(false);
  const [basic_notes, setBasicNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const [pinnedNotes, setPinnedNotes] = useState<Note[]>([]);

  const [key, setKey] = useState("");

  const [sortModal, setSortMoal] = useState(false);
  const [sort, setSort] = useState("");

  useEffect(() => {
    let filteredNotes = [];

    if (selected === Reserved.NOTES) {
      filteredNotes = original_notes;
    } else if (selected === Reserved.ARCHIVE) {
      filteredNotes = archive;
    } else if (selected === Reserved.TRASH) {
      filteredNotes = trash;
    } else {
      filteredNotes = original_notes.filter((note) =>
        note.tag.includes(selected)
      );
    }

    setBasicNotes(filteredNotes);
    setNotes(filteredNotes);
    setPinnedNotes(filteredNotes.filter((note) => note.pinned));
    setEmpty(filteredNotes.length === 0);
  }, [selected, original_notes, archive, trash]);

  const handleEdit = () => {
    dispatch(openNoteEditModal());
  };

  const handleDeleteAll = () => {
    dispatch(deleteTrash());
  };

  const handleSearch = (value: string) => {
    setKey(value);
    setNotes(
      basic_notes.filter((note) => {
        return note.title.includes(value);
      })
    );
  };

  const handleSortModal = (bool: boolean) => {
    setSortMoal(bool);
  };

  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value);
    if (sort === "low") {
      setNotes([...basic_notes].sort((a, b) => a.priority - b.priority));
    } else if (sort === "high") {
      setNotes([...basic_notes].sort((a, b) => b.priority - a.priority));
    } else if (sort === "latest") {
      setNotes([...basic_notes].sort((a, b) => b.time - a.time));
    } else if (sort === "created") {
      setNotes([...basic_notes].sort((a, b) => a.time - b.time));
    }
  };

  return (
    <main className="main">
      <div className="main__header">
        <p className="main__title">{selected}</p>
        {!(selected === Reserved.ARCHIVE || selected === Reserved.TRASH) && (
          <button className="main__add__note" onClick={handleEdit}>
            <CiSquarePlus />
          </button>
        )}
        {selected === Reserved.TRASH && (
          <button className="main__trash__deleteAll" onClick={handleDeleteAll}>
            휴지통 비우기
          </button>
        )}
      </div>

      {empty ? (
        <p className="main__notify">노트가 비었습니다.</p>
      ) : (
        <div className="main__content">
          <div className="main__tool">
            <form className="main__tool__search">
              <input
                name="key"
                placeholder="노트의 제목을 입력해주세요."
                value={key}
                onChange={(e) => handleSearch(e.target.value)}
              ></input>
            </form>
            <button
              className="main__tool__sort"
              onClick={() => handleSortModal(true)}
            >
              정렬
            </button>
            {sortModal && (
              <SortModal
                handleSortModal={handleSortModal}
                handleSort={handleSort}
                sort={sort}
              />
            )}
          </div>

          <div className="main__list">
            <div className="main__list__pinned">
              <p>Pinned Notes({pinnedNotes.length})</p>
              <List notes={pinnedNotes} selected={selected} />
            </div>
            <div className="main__list__unpinned">
              <p>All Notes ({notes.length})</p>
              <List notes={notes} selected={selected} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
