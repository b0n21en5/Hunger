import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import filter from "../assets/filter.svg";

const FilterButtons = ({ filterButtonConfig }) => {
  // Destructured components props
  const {
    filterApplied,
    checked,
    selectedFilter,
    dispatch,
    onFilterBtnClick,
    onFilterRemove,
  } = filterButtonConfig;

  return (
    <div
      style={{
        height: "90px",
        margin: "0 82px",
        position: "relative",
      }}
    >
      <div
        className="gap-3 d-flex flex-wrap"
        style={{
          padding: "26px 0",
          position: "sticky",
          top: "20px",
          zIndex: "2",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <button onClick={onFilterBtnClick} className="btn btn-info text-center">
          {filterApplied ? (
            <div className="btn btn-danger p-0 ps-1 pe-1 me-1">
              {filterApplied}
            </div>
          ) : (
            <img className="me-1" src={filter} alt="filter" />
          )}
          Filters
        </button>

        {!checked.length && (
          <div
            className="btn btn-info text-center"
            onClick={() => {
              dispatch({ type: "SET_LOAD_CUISINES", payload: true });
              dispatch({ type: "SET_LOAD_FILTER", payload: false });
            }}
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
