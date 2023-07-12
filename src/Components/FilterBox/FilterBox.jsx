import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./filterbox.css";

const FilterBox = ({ setLoadFilter, setSelectedFilter, foods }) => {
  const [sortValue, setSortValue] = useState("");

  // sort by low to high price
  const handleSortBy = () => {
    setSelectedFilter((prev) => [...prev, sortValue]);

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
        break;
    }
  };

  useEffect(() => {}, [sortValue]);

  // method to handle apply button
  const handleApply = () => {
    handleSortBy();
    setLoadFilter(false);
  };

  return (
    <div className="filter-box">
      <div className="top">
        <div className="d-flex align-items-center justify-content-between">
          <div className="title">Filters</div>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faXmark}
            onClick={() => setLoadFilter(false)}
          />
        </div>
      </div>
      <div className="content">
        <div className="d-flex">
          <div className="filter-by">
            <div className="p-2 btn-light">Sort By</div>
          </div>
          <form
            onChange={(e) => setSortValue(e.target.value)}
            className="filter-value "
          >
            <div className="p-2 d-flex flex-column">
              <label className="mb-4">
                <input type="radio" name="sort" value="Rating: High to Low" />
                &nbsp;Rating: High to Low
              </label>
              <label className="mb-4">
                <input type="radio" name="sort" value="Rating: Low to High" />
                &nbsp;Rating: Low to High
              </label>
              <label className="mb-4">
                <input type="radio" name="sort" value="Cost: High to Low" />
                &nbsp;Cost: High to Low
              </label>
              <label className="mb-4">
                <input type="radio" name="sort" value="Cost: Low to High" />
                &nbsp;Cost: Low to High
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom d-flex justify-content-end mt-2 gap-3">
        <button
          onClick={() => {
            setSelectedFilter([]);
            setLoadFilter(false);
          }}
          className="btn btn-light"
        >
          Clear all
        </button>
        <button onClick={() => handleApply()} className="btn btn-danger">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterBox;
