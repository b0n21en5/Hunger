import { createSlice } from "@reduxjs/toolkit";

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

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLoadFilter: (state, action) => {
      state.loadFilter = action.payload;
    },
    setLoadCuisines: (state, action) => {
      state.loadCuisines = action.payload;
    },
    addSelectedFilter: (state, action) => {
      state.selectedFilter.push(action.payload);
    },
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    setFilterApplied: (state, action) => {
      state.filterApplied = action.payload;
    },
    addCheckedFilter: (state, action) => {
      state.checked.push(action.payload);
    },
    setCheckedFilter: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setDataNotAvailable: (state, action) => {
      state.dataNotAvailable = action.payload;
    },
    setEndSearchResults: (state, action) => {
      state.endSearchResults = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setLoadFilter,
  setLoadCuisines,
  addSelectedFilter,
  setSelectedFilter,
  setFilterApplied,
  addCheckedFilter,
  setCheckedFilter,
  setRadio,
  setDataNotAvailable,
  setEndSearchResults,
  resetState,
} = filterSlice.actions;


export default filterSlice.reducer;