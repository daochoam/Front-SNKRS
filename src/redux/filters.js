// filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

const initialState = {
   sortBy: null,
   brand: null,
   model: null,
   size: null,
   color: null,
   data: {
      brands: [],
      types: [],
      categories: [],
      colors: [],
      sizes: [],
   },
   detail: {
      brands: [],
      types: [],
      categories: [],
      colors: [],
      sizes: []
   }
};

const filters = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setSortBy: (state, action) => {
         state.sortBy = action.payload;
      },
      setBrand: (state, action) => {
         state.brand = action.payload;
      },
      setModel: (state, action) => {
         state.model = action.payload;
      },
      setSize: (state, action) => {
         state.size = action.payload;
      },
      setColor: (state, action) => {
         state.color = action.payload;
      },
      setDataBrands: ({ data, detail }, { payload }) => {
         data.brands = payload.brands;
         detail.brands = payload.detailBrands;
      },
      setDataCategories: ({ data, detail }, { payload }) => {
         data.categories = payload.categories
         detail.categories = payload.detailCategories
      },
      setDataTypes: ({ data, detail }, { payload }) => {
         data.types = payload.types;
         detail.types = payload.detailTypes;
      },
      setDataColors: ({ data, detail }, { payload }) => {
         data.colors = payload.colors;
         detail.colors = payload.detailColors;
      },
      setDataSizes: ({ data, detail }, { payload }) => {
         data.sizes = payload.sizes;
         detail.sizes = payload.detailSizes;
      },
      clearTypes: ({ data, detail }, action) => {
         data.types = []
         detail.types = []
      },
      clearCategories: ({ data, detail }, action) => {
         data.categories = []
         detail.categories = []
      },
      clearFilters: (state, payload) => {
         state.sortBy = null
         state.brand = null
         state.model = null
         state.size = null
         state.color = null
      }
   },
});

export const fetchBrands = () => async (dispatch) => {
   try {
      const detailBrands = await axiosInstance.get('/brand')
      const brands = detailBrands.map(({ brand }) => brand)
      dispatch(setDataBrands({ brands, detailBrands }))
   } catch (error) {
      console.log(error.messages)
   }
}


export const fetchTypes = (category = 'shoes') => async (dispatch) => {
   try {
      dispatch(clearTypes())
      const detailTypes = await axiosInstance.get(`/type?category=${category}`)
      const types = detailTypes.map(({ type }) => type)
      dispatch(setDataTypes({ types, detailTypes }))
   } catch (error) {
      console.log(error.messages)
   }
}

export const fetchCategories = () => async (dispatch) => {
   try {
      const detailCategories = await axiosInstance.get(`/category`)
      const categories = detailCategories.map((({ category }) => category))
      dispatch(setDataCategories({ categories, detailCategories }))
   } catch (error) {
      console.log(error.messages)
   }
}

export const fetchColors = () => async (dispatch) => {
   try {
      const detailColors = await axiosInstance.get('/features/color')
      const colors = detailColors.map(({ name, html }) => { return { name, html } })
      dispatch(setDataColors({ colors, detailColors }))
   } catch (error) {
      console.log(error.messages)
   }
}

export const fetchSizes = (gender, category = 'shoes') => async (dispatch) => {
   try {
      const detailSizes = await axiosInstance.get(`/features/size?category=${category}&gender=${gender}`)
      const sizes = detailSizes.map(({ size }) => { return size }).sort((a, b) => parseFloat(a) - parseFloat(b))
      dispatch(setDataSizes({ sizes, detailSizes }))
   } catch (error) {
      console.log(error.messages)
   }
}

export const {
   setSortBy,
   setBrand,
   setModel,
   setSize,
   setColor,
   clearTypes,
   clearCategories,
   setDataBrands,
   setDataCategories,
   setDataColors,
   setDataSizes,
   setDataTypes,
} = filters.actions;

export default filters.reducer;
