import axiosInstance from '../utils/axiosInstance.js';
import { createSlice } from "@reduxjs/toolkit";
import { fetchSizes } from './filters.js';

const initialState = {
    products: [],
    sales: [],
    detail: {},
    pages: {
        currentPage: 0,
        itemRange: { min: 0, max: 0 },
        totalPages: 0,
    },
    salesPages: {
        currentPage: 0,
        itemRange: { min: 0, max: 0 },
        totalPages: 0,
    },
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload.products
            state.pages = { ...payload.pages }
        },
        setSales: (state, { payload }) => {
            state.sales = payload.products
            state.salesPages = { ...payload.pages }
        },
        setDetail: (state, { payload }) => {
            state.detail = payload
        },
        cleanProducts: (state, { payload }) => {
            state.products = []
        },
        cleanSales: (state, { payload }) => {
            state.sales = []
        },
        cleanDetail: (state, { payload }) => {
            state.detail = []
        }
    }
});
// Async action to sign in
export const fetchProducts = (filters) => async (dispatch) => {
    try {
        let endPoint = '/products'
        if (filters && Object.keys(filters).length) {
            Object.entries(filters).forEach(([key, value], index) => {
                if (!index) endPoint += `?${key}=${value}`
                else endPoint += `&${key}=${value}`
            })
        }
        const products = await axiosInstance.get(endPoint)
        dispatch(setProducts(products))
    } catch (error) {
        // Captura cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    }
};

export const fetchSales = (order = 'descending', filters) => async (dispatch) => {
    try {
        let endPoint = `/products?sortSales=${order}`
        if (filters && Object.keys(filters).length) {
            Object.entries(filters).forEach(([key, value], index) => {
                endPoint += `&${key}=${value}`
            })
        }
        const sales = await axiosInstance.get(endPoint)
        dispatch(setSales(sales))
    } catch (error) {
        // Captura cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    }
};

export const fetchDetail = (id) => async (dispatch) => {
    try {
        dispatch(cleanDetail())
        const productDetail = await axiosInstance.get(`/products/${id}`)
        if (productDetail) {
            dispatch(setDetail(productDetail))
        }
    }
    catch (error) {
        console.error('Error:', error.message);
    }
}

export const {
    setProducts,
    setDetail,
    setSales,
    cleanProducts,
    cleanSales,
    cleanDetail
} = productSlice.actions;

export default productSlice.reducer;