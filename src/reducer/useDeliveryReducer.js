export const initialState = {
  loadFilter: false,
  loadCuisines: false,
  selectedFilter: [],
  filterApplied: 0,
  checked: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOADFILTER-NO":
      return { ...state, loadFilter: false };
    case "LOADFILTER-YES":
      return { ...state, loadFilter: true };
    case "LOADCUISINES-NO":
      return { ...state, loadCuisines: false };
    case "LOADCUISINES-YES":
      return { ...state, loadCuisines: true };

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

    case "FILTER_APPLIED":
      return { ...state, filterApplied: action.payload };

    default:
      state;
  }
};
