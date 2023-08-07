import { useEffect, useState } from "react";
import Brands from "../Components/Brands/Brands";
import FoodList from "../Components/FoodCard/FoodList";
import Inspiration from "../Components/Inspiration/Inspiration";
import Layout from "../Components/Layout/Layout";
import { foods } from "../../data/food";
import useProductReducer from "./../reducer/useDeliveryReducer";
import FilterButtons from "../Components/FilterButtons";
import FoodNotAvailable from "../Components/FoodNotAvailable";
import { useDeliveryContext } from "../contexts/useDeliveryContext";

const Delivery = () => {
  // const [foodsData, setFoodsData] = useState(foods);
  const [foodNotAvailable, setFoodNotAvailable] = useState(false);

  const { state, dispatch } = useDeliveryContext();
  const {
    foodsData,
    loadFilter,
    loadCuisines,
    selectedFilter,
    filterApplied,
    checked,
    radio,
  } = state;

  useEffect(() => {
    // Set Foods Data on initial render
    dispatch({ type: "SET_FOODS_DATA", payload: foods });
  }, []);

  // Method to remove selected filter
  const onFilterRemove = (removeFilter) => {
    const filteredArray = selectedFilter.filter((sf) => {
      return sf !== removeFilter;
    });
    dispatch({ type: "SET_SELECTED_FILTER", payload: filteredArray });
    const filterChecked = checked.filter((sc) => {
      return sc !== removeFilter;
    });
    dispatch({ type: "SET_CHECKED_FILTER", payload: filterChecked });

    // filter foods data based on removed filters
    if (filterChecked.length) {
      let checkedArraySet = new Set();
      filterChecked.forEach((ch) => {
        foodsData.forEach((fd) => {
          if (fd.type.includes(ch)) checkedArraySet.add(fd);
        });
      });
      let checkedArray = Array.from(checkedArraySet);
      if (checkedArray.length) {
        dispatch({ type: "SET_FOODS_DATA", payload: checkedArray });
        setFoodNotAvailable(false);
      } else {
        dispatch({ type: "SET_FOODS_DATA", payload: foods });
        setFoodNotAvailable(true);
      }
    } else {
      // Clear all filters and reset data
      dispatch({ type: "SET_FOODS_DATA", payload: foods });

      setFoodNotAvailable(false);
    }
  };

  // Method to apply checked filters
  const onApplyCheckedFilter = () => {
    console.log("Checked filter applied");
    let uniqueSetFoods = new Set();

    checked.forEach((ch) => {
      if (!selectedFilter.includes(ch))
        dispatch({ type: "ADD_SELECTED_FILTER", payload: ch });

      foods.forEach((fd) => {
        if (fd.type.includes(ch)) {
          uniqueSetFoods.add(fd);
        }
      });
    });
    const checkedArray = Array.from(uniqueSetFoods);
    if (checkedArray.length) {
      dispatch({ type: "SET_FOODS_DATA", payload: checkedArray });
      setFoodNotAvailable(false);
    } else {
      dispatch({ type: "SET_FOODS_DATA", payload: foods });
      setFoodNotAvailable(true);
    }
  };

  // If selected filter changes re-render data
  useEffect(() => {
    if (selectedFilter.length) {
      dispatch({
        type: "SET_FILTER_APPLIED",
        payload: selectedFilter.length,
      });
    } else {
      dispatch({ type: "SET_FILTER_APPLIED", payload: 0 });
    }
  }, [selectedFilter?.length]);

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Page is being restored from back/forward cache
        // Update the necessary state and data accordingly
        // For example, you can fetch the latest data or reset the component's state
        // In this case, we are resetting the filter and reloading the data
        dispatch({ type: "SET_LOAD_FILTER", payload: false });
        dispatch({ type: "SET_LOAD_CUISINES", payload: false });
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <div className={`${loadFilter || loadCuisines ? "deactivate" : ""}`}>
      <Layout pathname="delivery">
        <FilterButtons onFilterRemove={onFilterRemove} />
        {foodNotAvailable && <FoodNotAvailable />}
        {!filterApplied && (
          <>
            <Inspiration
              onApplyCheckedFilter={onApplyCheckedFilter}
              dispatch={dispatch}
            />
            <Brands />
          </>
        )}
        <FoodList onApplyCheckedFilter={onApplyCheckedFilter} />
      </Layout>
    </div>
  );
};

export default Delivery;
