import axiosInstance from '../utils/axiosInstance.js';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    users: [],
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAllUsers: (state, action) => {
            state.users = action.payload
        },
    updateUserData: (state, action) => {
        if (state.user) {
        console.log("🚀 ~ file: user.js:23 ~ action.payload:", action.payload)
          state.user = { ...state.user, ...action.payload };
        }
    }}
});


export const selectUser = (state) => state.user.user;

export const fetchUserById = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/user"); 
        console.log('Data received:', response);
        dispatch(setUser(response));
    } catch (error) {
        console.error(error);
    }
};

export const updateUser = (updatedData) => async (dispatch) => {
    try {
        console.log("Updating user...");
        const response = await axiosInstance.put("/user", updatedData);
        dispatch(setUser(response));
    } catch (error) {
        console.error(error);
    }
};

export const fetchAllUser = (filters) => async (dispatch) => {
    try {
        let endPoint = '/admin'

        if (filters && Object.keys(filters).length) {
            Object.entries(filters).forEach(([key, value], index) => {
                if (!index) endPoint += `?${key}=${value}`
                else endPoint += `&${key}=${value}`
            })
        }
        const users = await axiosInstance.get(endPoint)

        dispatch(setUser(users))
        console.log(users);

    } catch (error) {
        console.log(error.message)
    }
}



export const {
    setAllUsers,
    updateUserData,
 setUser  
} = userSlice.actions;

export default userSlice.reducer;