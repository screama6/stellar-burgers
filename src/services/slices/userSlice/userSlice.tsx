import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../ingredientsSlice/ingredientsSlice';
import {
  checkUserAuth,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../../thunk/user';

type User = {
  name: string;
  email: string;
};

export type TUserState = {
  isAuthChecked: boolean;
  user: User | null;
  requestStatus: RequestStatus;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload.user;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload.user;
      });
  },
  selectors: {
    getUser: (state: TUserState) => state.user,
    getIsAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userActions = {
  ...userSlice.actions,
  checkUserAuth,
  registerUser,
  loginUser
};
export const userSelectors = userSlice.selectors;

export const userSliceReducer = userSlice.reducer;
