import { createContext, useContext, useEffect, useReducer } from "react";

// Initial state
const initialState = {
  fetchedData: [],
  loadFilter: false,
  loadCuisines: false,
  selectedFilter: [],
  filterApplied: 0,
  checked: [],
  radio: "",
  dataNotAvailable: false,
  endSearchResults: false,
};

// Reducer function
const deliveryReducer = (state, action) => {
  switch (action.type) {
    case "SET_FETCHED_DATA":
      return { ...state, fetchedData: action.payload };

    case "SET_LOAD_FILTER":
      return { ...state, loadFilter: action.payload };
    case "SET_LOAD_CUISINES":
      return { ...state, loadCuisines: action.payload };

    case "ADD_SELECTED_FILTER":
      return {
        ...state,
        selectedFilter: [...state.selectedFilter, action.payload],
      };
    case "SET_SELECTED_FILTER":
      return { ...state, selectedFilter: action.payload };

    case "ADD_CHECKED_FILTER":
      return { ...state, checked: [...state.checked, action.payload] };
    case "SET_CHECKED_FILTER":
      return { ...state, checked: action.payload };

    case "SET_FILTER_APPLIED":
      return { ...state, filterApplied: action.payload };

    case "SET_RADIO":
      return { ...state, radio: action.payload };

    case "SET_DATA_NOT_AVAILABLE":
      return { ...state, dataNotAvailable: action.payload };

    case "SET_END_SEARCH_RESULTS":
      return { ...state, endSearchResults: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
};

// Delivery Context
const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(deliveryReducer, initialState);

  // Method to apply checked filters
  const onApplyCheckedFilter = (resetData) => {
    let uniqueSetFoods = new Set();

    state.checked.forEach((ch) => {
      if (!state.selectedFilter.includes(ch))
        dispatch({ type: "ADD_SELECTED_FILTER", payload: ch });

      resetData.forEach((fd) => {
        console.log(fd);
        if (fd.type.includes(ch)) {
          uniqueSetFoods.add(fd);
        }
      });
    });
    const checkedArray = Array.from(uniqueSetFoods);
    if (checkedArray.length) {
      dispatch({ type: "SET_FETCHED_DATA", payload: checkedArray });
      dispatch({ type: "SET_DATA_NOT_AVAILABLE", payload: false });
      dispatch({ type: "SET_END_SEARCH_RESULTS", payload: true });
    } else {
      dispatch({ type: "SET_FETCHED_DATA", payload: resetData });
      dispatch({ type: "SET_DATA_NOT_AVAILABLE", payload: true });
      dispatch({ type: "SET_END_SEARCH_RESULTS", payload: false });
    }
  };

  // Method to remove selected filter
  const onFilterRemove = (removeFilter, resetData) => {
    const filteredArray = state.selectedFilter.filter((sf) => {
      return sf !== removeFilter;
    });
    dispatch({ type: "SET_SELECTED_FILTER", payload: filteredArray });
    const filterChecked = state.checked.filter((sc) => {
      return sc !== removeFilter;
    });
    dispatch({ type: "SET_CHECKED_FILTER", payload: filterChecked });

    // filter foods data based on removed filters
    if (filterChecked.length) {
      let checkedArraySet = new Set();
      filterChecked.forEach((ch) => {
        state.fetchedData.forEach((fd) => {
          if (fd.type.includes(ch)) checkedArraySet.add(fd);
        });
      });
      let checkedArray = Array.from(checkedArraySet);
      if (checkedArray.length) {
        dispatch({ type: "SET_FETCHED_DATA", payload: checkedArray });
        dispatch({ type: "SET_DATA_NOT_AVAILABLE", payload: false });
        dispatch({ type: "SET_END_SEARCH_RESULTS", payload: true });
      } else {
        dispatch({ type: "SET_FETCHED_DATA", payload: resetData });
        dispatch({ type: "SET_DATA_NOT_AVAILABLE", payload: true });
        dispatch({ type: "SET_END_SEARCH_RESULTS", payload: false });
      }
    } else {
      // Clear all filters and reset data
      dispatch({ type: "SET_FETCHED_DATA", payload: resetData });

      dispatch({ type: "SET_DATA_NOT_AVAILABLE", payload: false });
      dispatch({ type: "SET_END_SEARCH_RESULTS", payload: false });
    }
  };

  // Change filter applied value If selected filter changes
  useEffect(() => {
    if (state.selectedFilter.length) {
      dispatch({
        type: "SET_FILTER_APPLIED",
        payload: state.selectedFilter.length,
      });
    } else {
      dispatch({ type: "SET_FILTER_APPLIED", payload: 0 });
    }
  }, [state.selectedFilter?.length]);

  return (
    <FilterContext.Provider
      value={{ state, dispatch, onApplyCheckedFilter, onFilterRemove }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook for Filter Context
export const useFilterContext = () => useContext(FilterContext);
