import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { readCookieSession } from "../services";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, action) => {
      state.cartItems = action.payload;
      console.log(action.payload);
    },
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      console.log("state", action.payload);
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== itemIdToRemove
      );
      axiosInstance.put(`/trolley/remove`, { idPick: action.payload });
    },

    clearCart: (state) => {
      state.cartItems = [];
      axiosInstance.delete(`/trolley/empty`);
    },
    itemIncrement: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      axiosInstance.put(`/trolley/quantityPick/plus/${action.payload}`);
    },
    itemDecrement: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item && item?.quantity > 1) {
        item.quantity -= 1;
      }
      axiosInstance.put(`/trolley/quantityPick/less/${action.payload}`);
    },
    cleanTrolley: (state, action) => {
      state.cartItems = [];
    }
  },
});

export const getCartItems = () => async (dispatch) => {
  try {
    const { User_id } = readCookieSession();

    if (User_id) {
      const response = await axiosInstance.get(`/trolley`);
      dispatch(getCart(response));
    } else {
      // Manejo de errores o redirección si no se encuentra el User_id
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const addCartItemsById = (item) => async (dispatch) => {
  const product = {
    Product_id: item._id,
    color: item.color,
    size: item.size,
    price: item.price,
    quantity: 1,
    gender: item.gender,
    image: item.image,
  };
  try {
    const trolley = await axiosInstance.get(`/trolley`);
    const data = trolley.find((e) =>
      e.Product_id == product.Product_id &&
      e.size == product.size &&
      e.color.name == product.color.name)

    if (data) {
      Swal.fire({
        icon: "warning",
        title: "The Shoes has already been added",
        showConfirmButton: true,
      });
    } else {
      await axiosInstance.put("/trolley/add", product);
      dispatch(addToCart(item));
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeCartItemsById = (item) => async (dispatch) => {
  try {
    const { User_id } = readCookieSession();
    const response = await axiosInstance.put("/trolley/remove", {
      idTrolley: User_id,
      idPick: item.id,
    });
    dispatch(removeFromCart(item));
  } catch (error) {
    // Manejo de errores si es necesario
  }
};

export const clearAllCart = () => async (dispatch) => {
  try {
    const response = await axiosInstance.delete("/trolley/empty");
    dispatch(clearCart());
  } catch (error) {
    // Manejo de errores si es necesario
  }
};
export const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  cleanTrolley,
  itemIncrement,
  itemDecrement,
  setUserId,
} = cartSlice.actions;
export default cartSlice.reducer;
