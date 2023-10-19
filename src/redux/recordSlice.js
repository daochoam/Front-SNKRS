import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  record: [],
  sortingMethod: "asc",
};

const recordSlice = createSlice({
  name: "record",
  initialState,

  reducers: {
    getRecord: (state, action) => {
      state.record = action.payload;
      console.log(action.payload);
    },
    setSortingMethod: (state, action) => {
      state.sortingMethod = action.payload;
      if (action.payload === "asc") {
        state.record.sort((a, b) => {
          return new Date(a.purchase_date) - new Date(b.purchase_date);
        });
      } else if (action.payload === "desc") {
        state.record.sort((a, b) => {
          return new Date(b.purchase_date) - new Date(a.purchase_date);
        });
      }
    },
  },
});

export const fetchRecord = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/shopping");
    console.log("response record",response);
    dispatch(getRecord(response));
  } catch (error) {
    console.log(error);
  }
};

export const { getRecord,setSortingMethod} = recordSlice.actions;
export default recordSlice.reducer;
