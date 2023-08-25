import FoodCard from "./FoodCard";
import FilterBox from "../FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";
import ReactDOM from "react-dom";
import { useFilterContext } from "../../contexts/useFilterContext";
import endResults from "../../assets/end-results.avif";
import { useEffect, useState } from "react";
import "./foodlist.css";

const FoodList = ({ data, subHead, onApplyCheckedFilter, path }) => {
  const [showFilter, setShowFilter] = useState("sort");

  const { state, dispatch } = useFilterContext();

  // Destructuring functions and states from filter context
  const { loadFilter, loadCuisines, endSearchResults } = state;

  const handleCuisineClearBtn = () => {
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
    dispatch({ type: "SET_SELECTED_FILTER", payload: [] });
    dispatch({ type: "SET_CHECKED_FILTER", payload: [] });
  };

  const handleCuisineApplyBtn = () => {
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
    if (state.checked.length) onApplyCheckedFilter(path);
  };

  useEffect(() => {
    if (window.innerWidth <= 440 && loadCuisines) {
      setShowFilter("cuisines");
      dispatch({ type: "SET_LOAD_FILTER", payload: true });
    }
  }, [loadCuisines]);

  return (
    <div className="foodList">
      {data.length ? <h3 className="mt-4 mb-4">{subHead}</h3> : ""}

      {loadCuisines &&
        ReactDOM.createPortal(
          <div
            className="cuisine-modal-overlay"
            onClick={() =>
              dispatch({ type: "SET_LOAD_CUISINES", payload: false })
            }
          >
            <div
              className="cuisines-box mt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center cuisineTitle">
                <span>Cuisines</span>
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={faXmark}
                  onClick={() =>
                    dispatch({ type: "SET_LOAD_CUISINES", payload: false })
                  }
                />
              </div>
              <Cuisines checked={state.checked} dispatch={dispatch} />
              <div className="bottom d-flex justify-content-end mt-4 gap-3">
                <button
                  onClick={handleCuisineClearBtn}
                  className="btn btn-light"
                >
                  Clear all
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCuisineApplyBtn}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
      {loadFilter && (
        <FilterBox
          path={path}
          show={showFilter}
          onApplyCheckedFilter={onApplyCheckedFilter}
        />
      )}
      <div className="flex flex-col" role="button">
        <div className="d-flex flex-col flex-wrap gap-4 mt-3">
          {data.map((product) => (
            <FoodCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {state.checked.length && endSearchResults ? (
        <div className="d-flex justify-content-center align-items-center gap-5 mt-5">
          <div className="d-flex flex-column">
            <div style={{ fontSize: "25px", fontWeight: "600" }}>
              End of search results
            </div>
            <div style={{ color: "#828282" }}>
              Explore more popular restaurants below
            </div>
          </div>
          <img width="125" height="114" src={endResults} alt="end-of-results" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FoodList;
