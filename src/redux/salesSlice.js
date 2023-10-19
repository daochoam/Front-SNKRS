import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    oneSale : {},
    allSales: [],
};

export const sales = createSlice({
    name: "sales",
    initialState,
    reducers: {
        setAllSales: (state , action) => {
            state.allSales = action.payload;
        }
    }
});

export const fetchAllSales = () => async (dispatch) => {
    try {
        const data = (await axiosInstance.get("/admin/sales"));
        if(data.length>0) {
            dispatch(setAllSales(data))
        }
        else return
    } catch (error) {
        console.error("ERROR: ", error);
    }
};

export const {
    setAllSales
} = sales.actions;

export default sales.reducer;