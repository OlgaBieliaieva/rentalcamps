import { createSlice } from "@reduxjs/toolkit";
import { fetchAll, fetchByReq } from "./campersOperations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    campers: [],
    filteredCampers:[],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, handlePending)
      .addCase(fetchAll.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = null;
        state.campers = [...action.payload];
      })
      .addCase(fetchAll.rejected, handleRejected)

      .addCase(fetchByReq.pending, handlePending)
      .addCase(fetchByReq.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = null;
        state.filteredCampers = [...action.payload];
      })
      .addCase(fetchByReq.rejected, handleRejected);
  },
});

export const campersReducer = campersSlice.reducer;