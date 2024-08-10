import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../ingredientsSlice/ingredientsSlice';
import { getFeedsApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status?: RequestStatus;
};

export const getFeed = createAsyncThunk<TFeedState>(
  'feed/getFeed',
  getFeedsApi
);

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.totalToday = action.payload.totalToday;
        state.total = action.payload.total;
      })
      .addCase(getFeed.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorOrders: (state: TFeedState) => state.orders,
    selectorTotal: (state: TFeedState) => state.total,
    selectorTotalToday: (state: TFeedState) => state.totalToday,
    selectorIngredientsStatus: (state: TFeedState) => state.status
  }
});

export const selectorFeed = feedSlice.selectors;
export const feedSliceReducer = feedSlice.reducer;
