import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  results: [], // Almacena todos los resultados originales
  filteredResultsMen: [], // Almacena los resultados filtrados
  order: 'all',
};

export const resultsMenSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload; // Actualiza el estado con los resultados originales.
    },
    setFilteredResultsMen: (state, action) => {
      state.filteredResultsMen = action.payload; // Actualiza el estado con los resultados filtrados.
    },

  },
});
export const fetchData = () => async (dispatch) => {
  try {

    const { products } = await axiosInstance.get('/products');
    const rMen = products;
    dispatch(setResults(products));
    dispatch(setFilteredResultsMen([...products]));
  } catch (error) {
    console.error("Error:", error);
  }
};

// Exporta las acciones de ordenamiento y filtro
export const { setResults, setFilteredResultsMen } = resultsMenSlice.actions;

export default resultsMenSlice.reducer;





