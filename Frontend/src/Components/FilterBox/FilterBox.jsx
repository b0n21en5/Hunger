import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedFilter,
  setCheckedFilter,
  setLoadCuisines,
  setLoadFilter,
  setRadio,
  setSelectedFilter,
} from "../../store/filterSlice";

import "./filterbox.css";

const FilterBox = ({ show, onApplyCheckedFilter, path }) => {
  // Destructuring Filter contexts
  const state = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [sortValue, setSortValue] = useState(state.radio);
  const [showFilter, setShowFilter] = useState(show);

  const sortingOptions = [
    { value: "", label: " Popularity" },
    { value: "rating DESC", label: " Rating: High to Low" },
    { value: "rating", label: " Rating: Low to High" },
    { value: "price DESC", label: " Cost: High to Low" },
    { value: "price", label: " Cost: Low to High" },
  ];

  // sort by low to high price
  const handleSortBy = () => {
    if (state.radio) {
      let all = [];
      const prevRadio = sortingOptions.find((opt) => opt.value === state.radio);
      all = state.selectedFilter.filter((sf) => {
        return sf !== prevRadio.label;
      });
      dispatch(setSelectedFilter(all));
    }

    const currSortLabel = sortingOptions.find((opt) => opt.value === sortValue);

    dispatch(addSelectedFilter(currSortLabel.label));
    dispatch(setRadio(sortValue));
  };

  useEffect(() => {
    if (sortValue) {
      handleSortBy();
    }
  }, [sortValue]);

  // Method to handle apply button
  const onApplyBtnClicked = () => {
    dispatch(setLoadFilter(false));

    if (sortValue || state.checked.length) {
      onApplyCheckedFilter(path);
    }
  };

  // Clear all selected filters
  const onClearBtnClick = () => {
    dispatch(setLoadFilter(false));
    dispatch(setCheckedFilter([]));
    dispatch(setSelectedFilter([]));
    dispatch(setRadio(""));
    onApplyCheckedFilter(path);
  };

  return ReactDOM.createPortal(
    <div
      className="filter-modal-overlay"
      onClick={() => {
        dispatch(setLoadFilter(false));
        dispatch(setLoadCuisines(false));
      }}
    >
      <div className="filter-box" onClick={(e) => e.stopPropagation()}>
        <div className="top">
          <div className="d-flex align-items-center justify-content-between">
            <div className="title">Filters</div>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faXmark}
              onClick={() => dispatch(setLoadFilter(false))}
            />
          </div>
        </div>
        <div className="content">
          <div className="filter-by">
            <div
              id={`${showFilter === "sort" ? "active" : ""}`}
              className="p-4"
              onClick={() => {
                setShowFilter("sort");
              }}
            >
              Sort By
            </div>
            <div
              id={`${showFilter === "cuisines" ? "active" : ""}`}
              className="p-4"
              onClick={() => {
                setShowFilter("cuisines");
              }}
            >
              Cuisines
            </div>
          </div>
          {showFilter === "sort" ? (
            <form className="p-3">
              <div className="p-2 d-flex flex-column">
                {sortingOptions.map((option) => (
                  <label key={option.label} className="mb-4">
                    <input
                      type="radio"
                      value={option.value}
                      checked={sortValue === option.value}
                      onChange={(e) => {
                        setSortValue(e.target.value);
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </form>
          ) : showFilter === "cuisines" ? (
            <div className="cuisine-cnt">
              <Cuisines checked={state.checked} dispatch={dispatch} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bottom">
          <button onClick={onClearBtnClick} className="btn btn-light">
            Clear all
          </button>
          <button onClick={onApplyBtnClicked} className="btn btn-danger">
            Apply&nbsp;
            <FontAwesomeIcon className="apply-svg" icon={faCaretRight} />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default FilterBox;
