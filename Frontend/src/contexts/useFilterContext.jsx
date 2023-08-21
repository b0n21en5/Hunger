import { createContext, useContext, useEffect, useReducer } from "react";

// Initial state
const initialState = {
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
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook for Filter Context
export const useFilterContext = () => useContext(FilterContext);
