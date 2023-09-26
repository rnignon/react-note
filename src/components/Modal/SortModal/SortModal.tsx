import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import "./SortModal.css";

interface Props {
  handleSortModal: (bool: boolean) => void;
  handleSort: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sort: string;
}

export default function SortModal({
  handleSortModal,
  handleSort,
  sort,
}: Props) {
  return (
    <div className="edit__sort__container">
      <CiCircleRemove
        className="edit__delete"
        onClick={() => handleSortModal(false)}
      />
      <p className="edit__sort__title">정렬</p>
      <div className="edit__sort">
        <div className="edit__sort__priority__container">
          <div className="edit__sort__priority">
            <input
              type="radio"
              name="filter"
              value="low"
              id="low"
              checked={sort === "low"}
              onChange={(e) => handleSort(e)}
            />
            <label htmlFor="low">Low to High</label>
          </div>
          <div className="edit__sort__priority">
            <input
              type="radio"
              name="filter"
              value="high"
              id="high"
              checked={sort === "high"}
              onChange={(e) => handleSort(e)}
            />
            <label htmlFor="low">High to Low</label>
          </div>
        </div>
        <div className="edit__sort__date__container">
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              value="latest"
              id="new"
              checked={sort === "latest"}
              onChange={(e) => handleSort(e)}
            />
            <label htmlFor="new">Sort by Latest</label>
          </div>
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              value="created"
              id="create"
              checked={sort === "created"}
              onChange={(e) => handleSort(e)}
            />
            <label htmlFor="create">Sort by Created</label>
          </div>
        </div>
      </div>
    </div>
  );
}
