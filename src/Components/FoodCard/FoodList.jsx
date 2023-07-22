import FoodCard from "./FoodCard";
import FilterBox from "../FilterBox/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Cuisines from "../Cuisines/Cuisines";

const FoodList = ({ foodListConfig }) => {
  // Destructuring functions and states from props
  const {
    foodsData,
    loadFilter,
    loadCuisines,
    checked,
    radio,
    selectedFilter,
    dispatch,
    onCheckedFilter,
  } = foodListConfig;

  const handleCuisineClearBtn = () => {
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
    dispatch({ type: "REP_FILTER_ARR", payload: [] });
    dispatch({ type: "SET_CHECK_FILTER", payload: [] });
  };

  return (
    <div style={{ padding: "20px 82px" }}>
      <h3>Order food online in Jai Singh Road</h3>

      {loadCuisines && (
        <div className="cuisines-box mt-3">
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
          <Cuisines checked={checked} setChecked={dispatch} />
          <div className="bottom d-flex justify-content-end mt-4 gap-3">
            <button onClick={handleCuisineClearBtn} className="btn btn-light">
              Clear all
            </button>
            <button className="btn btn-danger" onClick={onCheckedFilter}>
              Apply
            </button>
          </div>
        </div>
      )}
      {loadFilter && (
        <FilterBox
          foods={foodsData}
          selectedFilter={selectedFilter}
          onCheckedFilter={onCheckedFilter}
          checked={checked}
          radio={radio}
          dispatch={dispatch}
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
