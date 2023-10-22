import axiosInstance from '../utils/axiosInstance.js';
import { createSlice } from "@reduxjs/toolkit";
import {
    SESSION_NAME,
} from "../const/const.jsx";
import { setCookieSession, readCookieSession, removeCookieSession } from '../services';
import { logOut } from '../services/firebase';
import { Signed } from '../components/Alerts';
import { cleanFavorites, fetchFavorites } from './favorites.js';
import { cleanTrolley, getCartItems } from './cartSlice.js';

const initialState = {
    view: false,
    status: true
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.view = false
            state.status = false
        },
        setLogOut: (state, action) => {
            state.view = false
            state.status = true
        },
        setViewLogin: (state, action) => {
            if (action.payload === undefined)
                state.view = !state.view
            else
                state.view = action.payload
        },
        setStatusLogin: (state, action) => {
            state.status = action.payload
        },
    },
});
// Async action to sign in
export const signIn = (userCredentials) => async (dispatch) => {
    try {
        const data = await axiosInstance.post(`/auth/sign-in`, userCredentials)
        if (data) {
            setCookieSession(SESSION_NAME, data)
            dispatch(setLogIn())
            dispatch(fetchFavorites())
            dispatch(getCartItems())
            Signed()
        } else {
            console.error('Error when closing session')
        }

    } catch (error) {
        // Captura cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    }
};

export const signOut = () => async (dispatch) => {
    try {
        await axiosInstance.post(`/auth/sign-out`);
    } catch (error) {
        null
    }
    dispatch(setLogOut());
    dispatch(cleanFavorites());
    dispatch(cleanTrolley());
    removeCookieSession();
    await logOut();
}
export const viewFormLog = () => (dispatch) => {
    const cookies = readCookieSession()
    if (cookies) {
        dispatch(setStatusLogin(false))
        dispatch(setViewLogin())
    } else {
        dispatch(setStatusLogin(true))
        dispatch(setViewLogin())
    }
}

export const {
    setLogIn,
    setLogOut,
    setStatusLogin,
    setViewLogin,
} = authSlice.actions;

export default authSlice.reducer;