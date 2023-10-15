import User from '../interfaces/User'

import { login, register } from '../graphql/queries'
import { doGraphQLFetch } from '../graphql/fetchGraphql'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginResponse, RegisterResponse } from '../interfaces/Responses'


const url = process.env.REACT_APP_API_URL as string


export const signup = createAsyncThunk(
  "user/register",
  async (user: User, {rejectWithValue}) => {
      const data: RegisterResponse = (await doGraphQLFetch(url, register, {user})) as RegisterResponse
      if (data.data.register === null) {
        return rejectWithValue(data.errors[0].message)
      }
      const recivedUser: User = data.data.register.data
      recivedUser.token = data.data.register.token;
      localStorage.setItem('user', JSON.stringify(recivedUser))
      localStorage.setItem('token', data.data.register.token);
    return recivedUser    
});
export const signin = createAsyncThunk(
  "user/login",
  async ({email, password}: User, {rejectWithValue}) => {
    
  const data: LoginResponse = (await doGraphQLFetch(url, login, {email, password})) as LoginResponse
  if (data.data.login !== null) {
    const recivedUser: User = data.data.login.user
    recivedUser.token = data.data.login.token;
    localStorage.setItem('user', JSON.stringify(recivedUser))
    localStorage.setItem('token', data.data.login.token)
    return recivedUser
  }
    return rejectWithValue(data.errors[0].message)
  }
);

