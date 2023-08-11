import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import filter from "../../assets/filter.svg";
import { useFilterContext } from "../../contexts/useFilterContext";
import "./filterbuttons.css";

const FilterButtons = ({ resetData }) => {
  // Destructuring Filter contexts
  const { state, dispatch, onFilterRemove } = useFilterContext();
  const { loadFilter, loadCuisines, filterApplied, selectedFilter } = state;

  // Method to handle filter button
  const onFilterBtnClick = () => {
    dispatch({ type: "SET_LOAD_FILTER", payload: true });
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
  };

  return (
    <div
      className="filter-buttons-cnt"
      style={{
        zIndex: `${loadFilter || loadCuisines ? "0" : "1"}`,
      }}
    >
      <div className="filter-buttons">
        <button onClick={onFilterBtnClick}>
          {filterApplied ? (
            <div className="btn-dngr">{filterApplied}</div>
          ) : (
            <img
              height="18"
              width="18"
              className="me-1"
              src={filter}
              alt="filter"
            />
          )}
          Filters
        </button>

        {!selectedFilter.length && (
          <button
            onClick={() => {
              dispatch({ type: "SET_LOAD_CUISINES", payload: true });
              dispatch({ type: "SET_LOAD_FILTER", payload: false });
            }}
          >
            Cusines
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        )}

        {selectedFilter?.map((seleFil, ind) => (
          <button
            key={ind}
            className="btn btn-danger"
            onClick={() => onFilterRemove(seleFil, resetData)}
          >
            {seleFil}
            <FontAwesomeIcon className="ms-2" icon={faXmark} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
