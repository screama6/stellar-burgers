import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TUser,
  UserLoginBodyDto,
  UserRegisterBodyDto,
  UserResponse,
  UserResponseToken
} from '@utils-types';
import { userActions } from '../slices/userSlice/userSlice';
import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TServerResponse,
  updateUserApi
} from '../../utils/burger-api';
import { useDispatch } from '../store';

// создатель данных - payload creator () =>
export const checkUserAuth = createAsyncThunk<UserResponse>(
  'user/auth/user',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk<
  UserResponseToken,
  UserRegisterBodyDto
>('user/auth/register', async (dataUser) => {
  const data = await registerUserApi(dataUser);
  setCookie('accessToken', data.accessToken);
  setCookie('refreshToken', data.refreshToken);
  return data;
});

export const loginUser = createAsyncThunk<UserResponseToken, UserLoginBodyDto>(
  'user/auth/login',
  async (dataUser) => {
    const data = await loginUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  'user/auth/logout',
  async () => await logoutApi()
);

export const updateUser = createAsyncThunk(
  'user/auth/userUpdate',
  updateUserApi
);
