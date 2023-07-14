import { useEffect, useReducer, useState } from "react";
import Brands from "../Components/Brands/Brands";
import FoodList from "../Components/FoodCard/FoodList";
import Inspiration from "../Components/Inspiration/Inspiration";
import Layout from "../Components/Layout/Layout";
import { foods } from "../../data/food";
import { initialState, reducer } from "../reducer/useDeliveryReducer";

const Delivery = () => {
  const [foodsData, setFoodsData] = useState(foods);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.selectedFilter.length);

  useEffect(() => {
    if (state.selectedFilter.length) {
      dispatch({
        type: "FILTER_APPLIED",
        payload: state.selectedFilter.length,
      });

      if (state.checked.length) {
        let checkedArray = [];
        state.checked.map((ch) => {
          foodsData.map((fd) => {
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
    // setSelectedFilter(filteredArray);
    dispatch({ type: "REP_FILTER_ARR", payload: filteredArray });
    const filterChecked = state.checked.filter((sc) => {
      return sc !== seleFil;
    });
    dispatch({ type: "SET_CHECK_FILTER", payload: filterChecked });
  };

  // method to handle filter button
  const onFilterBtnClick = () => {
    dispatch({ type: "LOADFILTER-YES" });
    dispatch({ type: "LOADCUISINES-NO" });
  };

  //   method apply checked filters
  const onCheckedFilter = () => {
    let checkedArray = [];
    dispatch({ type: "REP_FILTER_ARR", payload: state.checked });
    state.checked.map((ch) => {
      foodsData.map((fd) => {
        if (fd.type.includes(ch)) checkedArray.push(fd);
      });
    });
    setFoodsData(checkedArray);
    dispatch({ type: "LOADCUISINES-NO" });
  };

  useEffect(() => {
    dispatch({ type: "REP_FILTER_ARR", payload: state.checked });
  }, [state.checked?.length]);

  return (
    <Layout>
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
  );
};

export default Delivery;
