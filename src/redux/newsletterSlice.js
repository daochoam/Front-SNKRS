import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2"; // Importa SweetAlert2

export const subscribeToNewsletter = createAsyncThunk(
  "newsletter/subscribeToNewsletter",
  async (email) => {
    try {
      const data = await axiosInstance.post("/newsletter", { email });
    if(data){
      Swal.fire({
        icon: "success",
        title: "Subscription Successful",
        text: "Thank you for subscribing to our newsletter!",
      });

      return email;
    }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Subscription Error",
        text: "There was an error while subscribing. Please try again later.",
      });

      throw error;
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    subscriptionStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.subscriptionStatus = "loading";
        state.error = null;
      })
      .addCase(subscribeToNewsletter.fulfilled, (state) => {
        state.subscriptionStatus = "succeeded";
        state.error = null;
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.subscriptionStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsletterSlice.reducer;
