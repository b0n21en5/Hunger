import FoodCard from "./FoodCard";
import FilterBox from "../FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";
import ReactDOM from "react-dom";
import "./foodlist.css";
import { useDeliveryContext } from "../../contexts/useDeliveryContext";

const FoodList = ({ onApplyCheckedFilter }) => {
  const { state, dispatch } = useDeliveryContext();

  // Destructuring functions and states from props
  const { foodsData, loadFilter, loadCuisines, checked, selectedFilter } =
    state;

  const handleCuisineClearBtn = () => {
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
    dispatch({ type: "SET_SELECTED_FILTER", payload: [] });
    dispatch({ type: "SET_CHECKED_FILTER", payload: [] });
  };

  const handleCuisineApplyBtn = () => {
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
    if (checked.length) onApplyCheckedFilter(checked);
  };

  return (
    <div style={{ padding: "20px 82px" }}>
      <h3>Order food online in Jai Singh Road</h3>

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
              <Cuisines checked={checked} dispatch={dispatch} />
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
      {loadFilter && <FilterBox onApplyCheckedFilter={onApplyCheckedFilter} />}
      <div className="flex flex-col" role="button">
        <div className="d-flex flex-col flex-wrap gap-5 mt-3">
          {foodsData.map((fd) => (
            <FoodCard
              key={fd.id}
              title={fd.title}
              slug={`/order/${fd.slug}`}
              price={fd.price}
              type={fd.type}
              rating={fd.rating}
              imgSrc={fd.imgSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodList;
