// reviewSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    averageRating: null,
    error: null,
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
      state.error = null;
    },
    setAverageRating: (state, action) => {
      state.averageRating = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setReviews, setAverageRating, setError } = reviewSlice.actions;

export default reviewSlice.reducer;

export const postReview = (reviewData) => async (dispatch) => {
  try {
     const response = await axiosInstance.post('/review', reviewData);
    

    dispatch(setReviews(response.data)); // Actualizar el estado con las nuevas revisiones.
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getReviewsByUser = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/review?user=${userId}`);

    console.log(response)
    dispatch(setReviews(response.data)); // Actualizar el estado con las revisiones obtenidas.
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getAverageRatingByProduct = (productId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/review?product=${productId}`);

    dispatch(setAverageRating(response.data.averageRating)); // Actualizar el estado con el promedio del rating.
    dispatch(setReviews(response.data.reviews)); // Actualizar el estado con las revisiones obtenidas.
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const patchReview = (productId, reviewData) => async (dispatch) => {
  try {
    const response = await axiosInstance.patch(`/review?product=${productId}`, reviewData);

    dispatch(setReviews(response.data)); // Actualizar el estado con la revisión actualizada.
  } catch (error) {
    dispatch(setError(error.message));
  }
};
