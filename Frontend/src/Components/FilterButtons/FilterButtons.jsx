import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import filter from "../../assets/filter.svg";
import "./filterbuttons.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoadCuisines, setLoadFilter } from "../../store/filterSlice";

const FilterButtons = ({ onFilterRemove }) => {
  // Destructuring Filter contexts from redux store
  const state =
    useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // Method to handle filter button
  const onFilterBtnClick = () => {
    dispatch(setLoadFilter(true));
    dispatch(setLoadCuisines(false));
  };

  // Handle cuisine button click
  const onCuisineBtnClick = () => {
    if (window.innerWidth <= 440) {
      dispatch(setLoadCuisines(false));
      dispatch(setLoadFilter(true));
    } else {
      dispatch(setLoadCuisines(true));
      dispatch(setLoadFilter(false));
    }
  };

  return (
    <div
      className="filter-buttons-cnt"
      style={{
        zIndex: `${state.loadFilter || state.loadCuisines ? "0" : "1"}`,
      }}
    >
      <div className="filter-buttons">
        <button onClick={onFilterBtnClick}>
          {state.filterApplied ? (
            <div
              className="btn-dngr"
              style={{
                padding: "0 4px",
                marginRight: "4px",
                borderRadius: "4px",
              }}
            >
              {state.filterApplied}
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

        {!state.selectedFilter.length && (
          <button onClick={onCuisineBtnClick}>
            Cusines
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        )}

        {state.selectedFilter?.map((seleFil, ind) => (
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
