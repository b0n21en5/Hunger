import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./filterbox.css";
import Cuisines from "../Cuisines/Cuisines";

const FilterBox = ({
  setLoadFilter,
  setSelectedFilter,
  foods,
  onCheckedFilter,
  checked,
  setChecked,
}) => {
  const [sortValue, setSortValue] = useState("");
  const [showFilter, setShowFilter] = useState("sort");
  const [isActive, setIsActive] = useState("");

  // sort by low to high price
  const handleSortBy = () => {
    setSelectedFilter({ type: "ADD_FILTER_ARR", payload: sortValue });

    switch (sortValue) {
      case "Cost: Low to High":
        foods.sort((a, b) => {
          return a.price - b.price;
        });
        break;

      case "Cost: High to Low":
        foods.sort((a, b) => {
          return b.price - a.price;
        });
        break;

      case "Rating: Low to High":
        foods.sort((a, b) => {
          return a.rating - b.rating;
        });
        break;

      case "Rating: High to Low":
        foods.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;

      default:
        foods.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;
    }
  };

  useEffect(() => {
    console.log(sortValue);
  }, [sortValue]);

  // method to handle apply button
  const onApplyBtnClicked = () => {
    if (sortValue) handleSortBy();
    if (checked.length) onCheckedFilter();
    setLoadFilter({ type: "LOADFILTER-NO" });
  };

  // clear all selected filters
  const onClearBtnClick = () => {
    // setSelectedFilter({ type: "REP_FILTER_ARR", payload: [] });
    setLoadFilter({ type: "LOADFILTER-NO" });
    setChecked({ type: "SET_CHECK_FILTER", payload: [] });
  };

  // handle previous sort value
  // const isSortChecked = (e) => {
  //   console.log(e.target.value);
  //   return e.target.value === sortValue;
  // };

  return (
    <div className="filter-box">
      <div className="top">
        <div className="d-flex align-items-center justify-content-between">
          <div className="title">Filters</div>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faXmark}
            onClick={() => setLoadFilter({ type: "LOADFILTER-NO" })}
          />
        </div>
      </div>
      <div className="content">
        <div className="d-flex">
          <div className="filter-by">
            <div
              id={`${showFilter === "sort" ? "active" : ""}`}
              className="p-4 btn-light"
              onClick={() => {
                setShowFilter("sort");
              }}
            >
              Sort By
            </div>
            <div
              id={`${showFilter === "cuisines" ? "active" : ""}`}
              className="p-4 btn-light"
              onClick={() => {
                setShowFilter("cuisines");
              }}
            >
              Cuisines
            </div>
          </div>
          {showFilter === "sort" ? (
            <form
              onChange={(e) => setSortValue(e.target.value)}
              className="p-3"
            >
              <div className="p-2 d-flex flex-column">
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="popularity"
                    checked={sortValue === "" || sortValue === "popularity"}
                  />
                  &nbsp;Popularity
                </label>
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="Rating: High to Low"
                    checked={sortValue === "Rating: High to Low"}
                  />
                  &nbsp;Rating: High to Low
                </label>
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="Rating: Low to High"
                    checked={sortValue === "Rating: Low to High"}
                  />
                  &nbsp;Rating: Low to High
                </label>
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="Cost: High to Low"
                    checked={sortValue === "Cost: High to Low"}
                  />
                  &nbsp;Cost: High to Low
                </label>
                <label className="mb-4">
                  <input
                    type="radio"
                    name="sort"
                    value="Cost: Low to High"
                    checked={sortValue === "Cost: Low to High"}
                  />
                  &nbsp;Cost: Low to High
                </label>
              </div>
            </form>
          ) : showFilter === "cuisines" ? (
            <div className="p-4">
              <Cuisines checked={checked} setChecked={setChecked} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="bottom d-flex justify-content-end mt-2 gap-3 p-3">
        <button onClick={onClearBtnClick} className="btn btn-light">
          Clear all
        </button>
        <button onClick={() => onApplyBtnClicked()} className="btn btn-danger">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterBox;
