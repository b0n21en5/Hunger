import { useEffect, useState } from "react";
import Brands from "../Components/Brands/Brands";
import FoodList from "../Components/FoodCard/FoodList";
import Inspiration from "../Components/Inspiration/Inspiration";
import Layout from "../Components/Layout/Layout";
import { foods } from "../../data/food";
import useProductReducer from "./../reducer/useDeliveryReducer";
import FilterButtons from "../Components/FilterButtons";

const Delivery = () => {
  const [foodsData, setFoodsData] = useState(foods);

  const [
    { loadFilter, loadCuisines, selectedFilter, filterApplied, checked, radio },
    dispatch,
  ] = useProductReducer();

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
      let checkedArray = new Set();
      filterChecked.forEach((ch) => {
        foodsData.forEach((fd) => {
          if (fd.type.includes(ch)) checkedArray.add(fd);
        });
      });
      setFoodsData(Array.from(checkedArray));
      console.log("foods length: " + foodsData.length);
    } else {
      // Clear all filters and reset data
      setFoodsData(foods);
      console.log("foods length: " + foodsData.length);
    }
  };

  // Method to apply checked filters
  const onApplyCheckedFilter = () => {
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });

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
    setFoodsData(checkedArray);
    console.log("foods length: " + foodsData.length);
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

  // Encapsulation of FilterButtons props
  const filterButtonConfig = {
    filterApplied,
    checked,
    selectedFilter,
    dispatch,
    onFilterRemove,
  };

  // Encapsulation FoodList component props
  const foodListConfig = {
    foodsData,
    setFoodsData,
    loadFilter,
    loadCuisines,
    checked,
    radio,
    selectedFilter,
    dispatch,
    onApplyCheckedFilter,
  };

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Page is being restored from back/forward cache
        // Update the necessary state and data accordingly
        // For example, you can fetch the latest data or reset the component's state
        // In this case, we are resetting the filter and reloading the data
        dispatch({ type: "SET_LOAD_FILTER", payload: false });
        dispatch({ type: "SET_LOAD_CUISINES", payload: false });

        // let filteredArray = foods;
        // if (selectedFilter.length) {
        //   filteredArray = foods.filter((fd) => {
        //     return selectedFilter.some((sf) => fd.type.includes(sf));
        //   });
        // }
        // setFoodsData(filteredArray);
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
        <FilterButtons filterButtonConfig={filterButtonConfig} />
        {!filterApplied && (
          <>
            <Inspiration checked={checked} setChecked={dispatch} />
            <Brands />
          </>
        )}
        <FoodList foodListConfig={foodListConfig} />
      </Layout>
    </div>
  );
};

export default Delivery;
