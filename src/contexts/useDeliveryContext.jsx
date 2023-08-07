import { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  foodsData: [],
  loadFilter: false,
  loadCuisines: false,
  selectedFilter: [],
  filterApplied: 0,
  checked: [],
  radio: "",
};

// Reducer function
const deliveryReducer = (state, action) => {
  switch (action.type) {
    case "SET_FOODS_DATA":
      return { ...state, foodsData: action.payload };

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

    default:
      return state;
  }
};

// Delivery Context
const DeliveryContext = createContext();

export const DeliveryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(deliveryReducer, initialState);

  return (
    <DeliveryContext.Provider value={{ state, dispatch }}>
      {children}
    </DeliveryContext.Provider>
  );
};

// Custom hook for Delivery Context
export const useDeliveryContext = () => useContext(DeliveryContext);
