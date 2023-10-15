
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import User from '../interfaces/User';
import { RootState } from "../redux/store";
import { signup, signin } from '../services/userService';
const storedUser = (localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');



export interface UserState {
  loading: boolean;
  user: User;
  error: string | undefined;
  token: string;
}

const initialState: UserState = {
  loading: false,
  user: storedUser ? JSON.parse(storedUser) : {},
  error: "",
  token: storedToken || "",
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = {};
      state.token = "";
      state.error = "";
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload as User
      state.token = (action.payload as User).token as string
    });
    builder.addCase(signup.rejected, (state,action ) => {
      state.loading = false
      state.error = action.payload as string
      state.token = ""
      state.user = {}
    });
    builder.addCase(signin.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload as User
      state.token = action.payload?.token as string
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
      state.token = ""
      state.user = {}
    });
  }
});


export const { logout } = userSlice.actions

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer