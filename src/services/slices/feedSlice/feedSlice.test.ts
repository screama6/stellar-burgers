import { RequestStatus } from '../ingredientsSlice/ingredientsSlice';
import {
  feedSliceReducer,
  getFeed,
  initialState,
  TFeedState
} from './feedSlice';

describe('feedSlice', () => {
  it('should set isLoading to true and reset error to null when pending is dispatched', () => {
    const actualState = feedSliceReducer(
      { ...initialState },
      getFeed.pending('')
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Loading
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = {
      orders: [
        {
          _id: '1',
          status: 'success',
          name: '2',
          createdAt: '3',
          updatedAt: '4',
          number: 23,
          ingredients: []
        }
      ],
      total: 15,
      totalToday: 105
    };

    const actualState = feedSliceReducer(
      { ...initialState },
      getFeed.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      orders: testData.orders,
      total: testData.total,
      totalToday: testData.totalToday,
      status: RequestStatus.Success
    });
  });

  it('should set isLoading to true and reset error to null when rejected is dispatched', () => {
    const actualState = feedSliceReducer(
      { ...initialState },
      getFeed.rejected(null, '')
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Failed
    });
  });
});
