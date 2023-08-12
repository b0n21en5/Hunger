import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";
import ReactDOM from "react-dom";
import { useFilterContext } from "../../contexts/useFilterContext";

import "./filterbox.css";

const FilterBox = ({ resetData, show }) => {
  // Destructuring Filter contexts
  const { state, dispatch, onApplyCheckedFilter } = useFilterContext();
  const { fetchedData, selectedFilter, checked, radio } = state;

  const [sortValue, setSortValue] = useState(radio);
  const [showFilter, setShowFilter] = useState(show);

  // sort by low to high price
  const handleSortBy = () => {
    if (radio) {
      let all = [];
      all = selectedFilter.filter((sf) => {
        return sf !== radio;
      });
      dispatch({ type: "SET_SELECTED_FILTER", payload: all });
    }

    dispatch({ type: "ADD_SELECTED_FILTER", payload: sortValue });
    dispatch({ type: "SET_RADIO", payload: sortValue });

    let sortedFoods = [...fetchedData];
    switch (sortValue) {
      case "Cost: Low to High":
        sortedFoods.sort((a, b) => {
          return a.price - b.price;
        });
        break;

      case "Cost: High to Low":
        sortedFoods.sort((a, b) => {
          return b.price - a.price;
        });
        break;

      case "Rating: Low to High":
        sortedFoods.sort((a, b) => {
          return a.rating - b.rating;
        });
        break;

      case "Rating: High to Low":
        sortedFoods.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;

      default:
        sortedFoods.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;
    }
    dispatch({ type: "SET_FOODS_DATA", payload: sortedFoods });
  };

  // Method to handle apply button
  const onApplyBtnClicked = () => {
    dispatch({ type: "SET_LOAD_FILTER", payload: false });
    if (sortValue) handleSortBy();

    if (checked.length) {
      onApplyCheckedFilter(resetData);
    }
  };

  // Clear all selected filters
  const onClearBtnClick = () => {
    dispatch({ type: "SET_LOAD_FILTER", payload: false });
    dispatch({ type: "SET_CHECKED_FILTER", payload: [] });
    dispatch({ type: "SET_SELECTED_FILTER", payload: [] });
    dispatch({ type: "SET_RADIO", payload: "" });
    onApplyCheckedFilter(resetData);
  };

  return ReactDOM.createPortal(
    <div
      className="filter-modal-overlay"
      onClick={() => {
        dispatch({ type: "SET_LOAD_FILTER", payload: false });
        dispatch({ type: "SET_LOAD_CUISINES", payload: false });
      }}
    >
      <div className="filter-box" onClick={(e) => e.stopPropagation()}>
        <div className="top">
          <div className="d-flex align-items-center justify-content-between">
            <div className="title">Filters</div>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faXmark}
              onClick={() =>
                dispatch({ type: "SET_LOAD_FILTER", payload: false })
              }
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
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="popularity"
                    checked={sortValue === ""}
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                  &nbsp;Popularity
                </label>
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="Rating: High to Low"
                    checked={sortValue === "Rating: High to Low"}
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                  &nbsp;Rating: High to Low
                </label>
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="Rating: Low to High"
                    checked={sortValue === "Rating: Low to High"}
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                  &nbsp;Rating: Low to High
                </label>
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="Cost: High to Low"
                    checked={sortValue === "Cost: High to Low"}
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                  &nbsp;Cost: High to Low
                </label>
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="Cost: Low to High"
                    checked={sortValue === "Cost: Low to High"}
                    onChange={(e) => {
                      setSortValue(e.target.value);
                    }}
                  />
                  &nbsp;Cost: Low to High
                </label>
              </div>
            </form>
          ) : showFilter === "cuisines" ? (
            <div className="cuisine-cnt">
              <Cuisines checked={checked} dispatch={dispatch} />
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
