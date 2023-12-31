import ProductCard from "./ProductCard";
import FilterBox from "../FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";
import ReactDOM from "react-dom";
import endResults from "../../assets/end-results.avif";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCheckedFilter,
  setLoadCuisines,
  setLoadFilter,
  setSelectedFilter,
} from "../../store/filterSlice";
import "./productlist.css";

const ProductList = ({ data, subHead, onApplyCheckedFilter, path }) => {
  const [showFilter, setShowFilter] = useState("sort");

  const state = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleCuisineClearBtn = () => {
    dispatch(setLoadCuisines(false));
    dispatch(setSelectedFilter([]));
    dispatch(setCheckedFilter([]));
  };

  const handleCuisineApplyBtn = () => {
    dispatch(setLoadCuisines(false));
    if (state.checked.length) onApplyCheckedFilter(path);
  };

  useEffect(() => {
    if (window.innerWidth <= 440 && state.loadCuisines) {
      setShowFilter("cuisines");
      dispatch(setLoadFilter(true));
    }
  }, [state.loadCuisines]);

  return (
    <div className="foodList">
      {data.length ? <h3 className="mt-4 mb-4">{subHead}</h3> : ""}

      {state.loadCuisines &&
        ReactDOM.createPortal(
          <div
            className="cuisine-modal-overlay"
            onClick={() => dispatch(setLoadCuisines(false))}
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
                  onClick={() => dispatch(setLoadCuisines(false))}
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
      {state.loadFilter && (
        <FilterBox
          path={path}
          show={showFilter}
          onApplyCheckedFilter={onApplyCheckedFilter}
        />
      )}
      <div className="flex flex-col" role="button">
        <div className="d-flex flex-col flex-wrap gap-4 mt-3">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {state.checked.length && state.endSearchResults ? (
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

export default ProductList;
