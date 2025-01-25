import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  currentUserThunk,
  signInThunk,
  signOutThunk,
  signUpThunk,
} from "./operations";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  token: "",
  isLoggedIn: false,
  isLoading: false,
  isRefresh: false,
  error: null,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = payload.token;
        state.user = {
          name: payload.name,
          email: payload.email,
        };
      })
      .addCase(signInThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = payload.token;
        state.user = {
          name: payload.name,
          email: payload.email,
        };
      })
      .addCase(currentUserThunk.fulfilled, (state, { payload }) => {
        state.isRefresh = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = payload.token;
        state.user.name = payload.name;
        state.user.email = payload.email;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = "";
        state.user = {
          email: "",
          name: "",
        };
      })
      .addCase(currentUserThunk.pending, (state) => {
        state.isRefresh = true;
      })
      .addCase(currentUserThunk.rejected, (state, { payload }) => {
        state.isRefresh = false;
        state.error = payload;
      })
      .addMatcher(
        isAnyOf(signUpThunk.pending, signInThunk.pending, signOutThunk.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          signUpThunk.rejected,
          signInThunk.rejected,
          signOutThunk.rejected,
          currentUserThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const authReducer = slice.reducer;
