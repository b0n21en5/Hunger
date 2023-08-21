import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import filter from "../../assets/filter.svg";
import { useFilterContext } from "../../contexts/useFilterContext";
import "./filterbuttons.css";

const FilterButtons = ({ onFilterRemove }) => {
  // Destructuring Filter contexts
  const { state, dispatch } = useFilterContext();
  const { loadFilter, loadCuisines, filterApplied, selectedFilter } = state;

  // Method to handle filter button
  const onFilterBtnClick = () => {
    dispatch({ type: "SET_LOAD_FILTER", payload: true });
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
  };

  // Handle cuisine button click
  const onCuisineBtnClick = () => {
    if (window.innerWidth <= 412) {
      dispatch({ type: "SET_LOAD_CUISINES", payload: false });
      dispatch({ type: "SET_LOAD_FILTER", payload: true });
    } else {
      dispatch({ type: "SET_LOAD_CUISINES", payload: true });
      dispatch({ type: "SET_LOAD_FILTER", payload: false });
    }
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
            <div
              className="btn-dngr"
              style={{
                padding: "0 4px",
                marginRight: "4px",
                borderRadius: "4px",
              }}
            >
              {filterApplied}
            </div>
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
          <button onClick={onCuisineBtnClick}>
            Cusines
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        )}

        {selectedFilter?.map((seleFil, ind) => (
          <button
            key={ind}
            className="btn btn-dngr"
            onClick={() => onFilterRemove(seleFil)}
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
