import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { constructorSlice } from './slices/constructorSlice/constructorSlice';
import { feedSlice } from './slices/feedSlice/feedSlice';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { orderSlice } from './slices/orderSlice/orderSlice';
import { ordersSlice } from './slices/ordersSlice/ordersSlice';
import { userSlice } from './slices/userSlice/userSlice';
import { rootReducer } from './store';

const initialRootState = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [userSlice.name]: userSlice.getInitialState(),
  [constructorSlice.name]: constructorSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [ordersSlice.name]: ordersSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState()
};

describe('rootReducver', () => {
  it('проверка состояния', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const state = rootReducer(initialRootState, action);

    expect(state).toEqual(initialRootState);
  });

  it('проверка инициализации', () => {
    const store = configureStore({ reducer: rootReducer });

    const state = store.getState();

    expect(state).toEqual(initialRootState);
  });
});
