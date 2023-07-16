import FoodCard from "./FoodCard";
import FilterBox from "../FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";

const FoodList = ({ onCheckedFilter, state, dispatch, foodsData }) => {
  return (
    <div style={{ padding: "20px 82px" }}>
      <h3>Order food online in Jai Singh Road</h3>

      {state.loadCuisines && (
        <div className="cuisines-box mt-3">
          <div className="d-flex justify-content-between align-items-center cuisineTitle">
            <span>Cuisines</span>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faXmark}
              onClick={() => dispatch({ type: "LOADCUISINES-NO" })}
            />
          </div>
          <Cuisines checked={state.checked} setChecked={dispatch} />
          <div className="bottom d-flex justify-content-end mt-4 gap-3">
            <button
              onClick={() => {
                dispatch({ type: "LOADCUISINES-NO" });
                dispatch({ type: "REP_FILTER_ARR", payload: [] });
                dispatch({ type: "SET_CHECK_FILTER", payload: [] });
              }}
              className="btn btn-light"
            >
              Clear all
            </button>
            <button className="btn btn-danger" onClick={onCheckedFilter}>
              Apply
            </button>
          </div>
        </div>
      )}
      {state.loadFilter && (
        <FilterBox
          setLoadFilter={dispatch}
          foods={foodsData}
          setSelectedFilter={dispatch}
          onCheckedFilter={onCheckedFilter}
          checked={state.checked}
          setChecked={dispatch}
        />
      )}
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
