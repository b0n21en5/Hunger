import { useEffect, useState } from "react";
import Brands from "../Components/Brands/Brands";
import FoodList from "../Components/FoodCard/FoodList";
import Inspiration from "../Components/Inspiration/Inspiration";
import Layout from "../Components/Layout/Layout";
import { foods } from "../../data/food";
import useProductReducer from "./../reducer/useDeliveryReducer";
import FilterButtons from "../Components/FilterButtons";

const foodsDataInitialState = foods;

const Delivery = () => {
  const [foodsData, setFoodsData] = useState(foodsDataInitialState);

  const [
    { loadFilter, loadCuisines, selectedFilter, filterApplied, checked, radio },
    dispatch,
  ] = useProductReducer();

  // Method to handle filter button
  const onFilterBtnClick = () => {
    dispatch({ type: "SET_LOAD_FILTER", payload: true });
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });
  };

  // Method to remove selected filter
  const onFilterRemove = (removeFilter) => {
    const filteredArray = selectedFilter.filter((sf) => {
      return sf !== removeFilter;
    });
    dispatch({ type: "REP_FILTER_ARR", payload: filteredArray });
    const filterChecked = checked.filter((sc) => {
      return sc !== removeFilter;
    });
    dispatch({ type: "SET_CHECK_FILTER", payload: filterChecked });
  };

  // Method to apply checked filters
  const onCheckedFilter = () => {
    dispatch({ type: "SET_LOAD_CUISINES", payload: false });

    let checkedArray = [];

    checked.forEach((ch) => {
      if (!selectedFilter.includes(ch))
        dispatch({ type: "ADD_FILTER_ARR", payload: ch });

      foods.forEach((fd) => {
        if (fd.type.includes(ch)) checkedArray.push(fd);
      });
    });
    setFoodsData(checkedArray);
  };

  // If selected filter changes re-render data
  useEffect(() => {
    if (selectedFilter.length) {
      dispatch({
        type: "SET_FILTER_APPLIED",
        payload: selectedFilter.length,
      });

      if (checked.length) {
        let checkedArray = [];
        checked.forEach((ch) => {
          foods.forEach((fd) => {
            if (fd.type.includes(ch)) checkedArray.push(fd);
          });
        });
        setFoodsData(checkedArray);
      }
    } else {
      dispatch({ type: "SET_FILTER_APPLIED", payload: 0 });

      // Clear all filters and reset data
      setFoodsData(foods);
    }
  }, [selectedFilter.length]);

  useEffect(() => {
    dispatch({ type: "REP_FILTER_ARR", payload: checked });
  }, [checked?.length]);

  // Encapsulation of FilterButtons props
  const filterButtonConfig = {
    filterApplied,
    checked,
    selectedFilter,
    dispatch,
    onFilterBtnClick,
    onFilterRemove,
  };

  // Encapsulation FoodList component props
  const foodListConfig = {
    foodsData,
    loadFilter,
    loadCuisines,
    checked,
    radio,
    selectedFilter,
    dispatch,
    onCheckedFilter,
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
