import { useReducer } from "react";

// Initial state
export const initialState = {
  loadFilter: false,
  loadCuisines: false,
  selectedFilter: [],
  filterApplied: 0,
  checked: [],
  radio: "",
};

// Reducer function
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOAD_FILTER":
      return { ...state, loadFilter: action.payload };
    case "SET_LOAD_CUISINES":
      return { ...state, loadCuisines: action.payload };

    case "ADD_FILTER_ARR":
      return {
        ...state,
        selectedFilter: [...state.selectedFilter, action.payload],
      };
    case "REP_FILTER_ARR":
      return { ...state, selectedFilter: action.payload };

    case "ADD_CHECK_FILTER":
      return { ...state, checked: [...state.checked, action.payload] };
    case "SET_CHECK_FILTER":
      return { ...state, checked: action.payload };

    case "SET_FILTER_APPLIED":
      return { ...state, filterApplied: action.payload };

    case "SET_RADIO":
      return { ...state, radio: action.payload };

    default:
      return state;
  }
};

// Custom hook
const useProductReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
};

export default useProductReducer;
