import { useEffect, useReducer, useState } from "react";
import Brands from "../Components/Brands/Brands";
import FoodList from "../Components/FoodCard/FoodList";
import Inspiration from "../Components/Inspiration/Inspiration";
import Layout from "../Components/Layout/Layout";
import { foods } from "../../data/food";
import { initialState, reducer } from "../reducer/useDeliveryReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import filter from "../assets/filter.svg";

const Delivery = () => {
  const [foodsData, setFoodsData] = useState(foods);

  const [state, dispatch] = useReducer(reducer, initialState);

  // method to handle filter button
  const onFilterBtnClick = () => {
    dispatch({ type: "LOADFILTER-YES" });
    dispatch({ type: "LOADCUISINES-NO" });
  };

  useEffect(() => {
    if (state.selectedFilter.length) {
      dispatch({
        type: "FILTER_APPLIED",
        payload: state.selectedFilter.length,
      });

      if (state.checked.length) {
        let checkedArray = [];
        state.checked.map((ch) => {
          foods.map((fd) => {
            if (fd.type.includes(ch)) checkedArray.push(fd);
          });
        });
        setFoodsData(checkedArray);
      }
    } else {
      dispatch({ type: "FILTER_APPLIED", payload: 0 });

      // clear all filters reset data
      setFoodsData(foods);
    }
  }, [state.selectedFilter.length]);

  // method to  remove selected filter
  const onFilterRemove = (seleFil) => {
    const filteredArray = state.selectedFilter.filter((sf) => {
      return sf !== seleFil;
    });
    dispatch({ type: "REP_FILTER_ARR", payload: filteredArray });
    const filterChecked = state.checked.filter((sc) => {
      return sc !== seleFil;
    });
    dispatch({ type: "SET_CHECK_FILTER", payload: filterChecked });
  };

  // method to apply checked filters
  const onCheckedFilter = () => {
    dispatch({ type: "LOADCUISINES-NO" });

    let checkedArray = [];

    state.checked.map((ch) => {
      if (!state.selectedFilter.includes(ch))
        dispatch({ type: "ADD_FILTER_ARR", payload: ch });

      foods.map((fd) => {
        if (fd.type.includes(ch)) checkedArray.push(fd);
      });
    });
    setFoodsData(checkedArray);
  };

  useEffect(() => {
    dispatch({ type: "REP_FILTER_ARR", payload: state.checked });
  }, [state.checked?.length]);

  return (
    <div
      className={`${
        state.loadFilter || state.loadCuisines ? "deactivate" : ""
      }`}
    >
      <Layout pathname="delivery">
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
            <button
              onClick={onFilterBtnClick}
              className="btn btn-info text-center"
            >
              {state.filterApplied ? (
                <div className="btn btn-danger p-0 ps-1 pe-1 me-1">
                  {state.filterApplied}
                </div>
              ) : (
                <img className="me-1" src={filter} alt="filter" />
              )}
              Filters
            </button>

            {!state.checked.length && (
              <div
                className="btn btn-info text-center"
                onClick={() => {
                  dispatch({ type: "LOADCUISINES-YES" });
                  dispatch({ type: "LOADFILTER-NO" });
                }}
              >
                Cusines
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            )}

            {state.selectedFilter?.map((seleFil, ind) => (
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
        {!state.filterApplied && (
          <>
            <Inspiration checked={state.checked} setChecked={dispatch} />
            <Brands />
          </>
        )}
        <FoodList
          onCheckedFilter={onCheckedFilter}
          onFilterBtnClick={onFilterBtnClick}
          onFilterRemove={onFilterRemove}
          state={state}
          dispatch={dispatch}
          foodsData={foodsData}
        />
      </Layout>
    </div>
  );
};

export default Delivery;
