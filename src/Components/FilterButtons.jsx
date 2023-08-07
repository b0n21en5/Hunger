import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import filter from "../assets/filter.svg";
import { useDeliveryContext } from "../contexts/useDeliveryContext";

const FilterButtons = ({ onFilterRemove }) => {
  // Destructuring delivery contexts
  const { state, dispatch } = useDeliveryContext();
  const { loadFilter, loadCuisines, filterApplied, selectedFilter } = state;

  // Method to handle filter button
  const onFilterBtnClick = () => {
    dispatch({ type: "SET_LOAD_FILTER", payload: true });
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
  };

  return (
    <div
      className="filter-buttons"
      style={{
        position: "sticky",
        top: "0",
        margin: "0 82px",
        background: "white",
        zIndex: `${loadFilter || loadCuisines ? "0" : "1"}`,
        borderBottom: " 0.2px solid rgba(207, 207, 207, 0.486)",
      }}
    >
      <div
        className="gap-3 d-flex flex-wrap"
        style={{
          padding: "26px 0",
        }}
      >
        <button
          onClick={onFilterBtnClick}
          className="btn text-center"
          style={{ border: "0.5px solid #bebebe9f" }}
        >
          {filterApplied ? (
            <div className="btn btn-danger p-0 ps-1 pe-1 me-1">
              {filterApplied}
            </div>
          ) : (
            <img className="me-1" src={filter} alt="filter" />
          )}
          Filters
        </button>

        {!selectedFilter.length && (
          <div
            className="btn text-center"
            onClick={() => {
              dispatch({ type: "SET_LOAD_CUISINES", payload: true });
              dispatch({ type: "SET_LOAD_FILTER", payload: false });
            }}
            style={{ border: "0.5px solid #bebebe9f" }}
          >
            Cusines
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        )}

        {selectedFilter?.map((seleFil, ind) => (
          <button
            key={ind}
            className="btn btn-danger"
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
