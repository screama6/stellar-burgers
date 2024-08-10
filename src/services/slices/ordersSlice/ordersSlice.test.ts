import { RequestStatus } from '../ingredientsSlice/ingredientsSlice';
import {
  getOrders,
  initialState,
  ordersSliceReducer,
  TOrdersState
} from './ordersSlice';

describe('ordersSlice', () => {
  it('should set isLoading to true and reset error to null when pending is dispatched', () => {
    const actualState = ordersSliceReducer(
      { ...initialState },
      getOrders.pending('')
    );

    expect(actualState).toEqual({
      orders: [],
      status: RequestStatus.Loading
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = [
      {
        _id: '1',
        status: 'success',
        name: '2',
        createdAt: '3',
        updatedAt: '4',
        number: 23,
        ingredients: []
      }
    ];

    const actualState = ordersSliceReducer(
      { ...initialState },
      getOrders.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      orders: testData,
      status: RequestStatus.Success
    });
  });

  it('should set isLoading to true and reset error to null when rejected is dispatched', () => {
    const actualState = ordersSliceReducer(
      { ...initialState },
      getOrders.rejected(null, '')
    );

    expect(actualState).toEqual({
      orders: [],
      status: RequestStatus.Failed
    });
  });
});
