import {
  getOrderByNumber,
  initialState,
  orderBurger,
  orderSliceReducer,
  TOrderState
} from './orderSlice';

describe('orderSlice', () => {
  it('should set isLoading to true and reset error to null when pending is dispatched', () => {
    const actualState = orderSliceReducer(
      { ...initialState },
      orderBurger.pending('', [])
    );

    expect(actualState).toEqual({
      info: null,
      isNewOrderLoading: true,
      isOrderByNumberLoading: false,
      ordersByNumber: null
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = {
      success: true,
      order: {
        _id: '1',
        status: 'success',
        name: '2',
        createdAt: '3',
        updatedAt: '4',
        number: 23,
        ingredients: []
      },
      name: '15'
    };

    const actualState = orderSliceReducer(
      { ...initialState },
      orderBurger.fulfilled(testData, '', [])
    );

    expect(actualState).toEqual({
      info: testData,
      isNewOrderLoading: false,
      isOrderByNumberLoading: false,
      ordersByNumber: null
    });
  });

  it('should set isLoading to true and reset error to null when rejected is dispatched', () => {
    const actualState = orderSliceReducer(
      { ...initialState },
      orderBurger.rejected(null, '', [])
    );

    expect(actualState).toEqual({
      info: null,
      isNewOrderLoading: false,
      isOrderByNumberLoading: false,
      ordersByNumber: null
    });
  });
  it('should set isLoading to true and reset error to null when pending is dispatched', () => {
    const actualState = orderSliceReducer(
      { ...initialState },
      getOrderByNumber.pending('', 1)
    );

    expect(actualState).toEqual({
      info: null,
      isNewOrderLoading: false,
      isOrderByNumberLoading: true,
      ordersByNumber: null
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = {
      success: true,
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
      ]
    };

    const actualState = orderSliceReducer(
      { ...initialState },
      getOrderByNumber.fulfilled(testData, '', 1)
    );

    expect(actualState).toEqual({
      info: null,
      isNewOrderLoading: false,
      isOrderByNumberLoading: false,
      ordersByNumber: testData.orders[0]
    });
  });

  it('should set isLoading to true and reset error to null when rejected is dispatched', () => {
    const actualState = orderSliceReducer(
      { ...initialState },
      getOrderByNumber.rejected(null, '', 1)
    );

    expect(actualState).toEqual({
      info: null,
      isNewOrderLoading: false,
      isOrderByNumberLoading: false,
      ordersByNumber: null
    });
  });
});
