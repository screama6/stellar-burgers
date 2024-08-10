import {
  getIngredients,
  ingredientsReducer,
  initialState,
  RequestStatus,
  TIngredientState
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  it('should set isLoading to true and reset error to null when pending is dispatched', () => {
    const actualState = ingredientsReducer(
      { ...initialState },
      getIngredients.pending('')
    );

    expect(actualState).toEqual({
      data: [],
      status: RequestStatus.Loading
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled is dispatched', () => {
    const testData = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'type1',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 1.5,
        image: 'image1',
        image_large: 'large1',
        image_mobile: 'mobile1'
      }
    ];

    const actualState = ingredientsReducer(
      { ...initialState },
      getIngredients.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      data: testData,
      status: RequestStatus.Success
    });
  });

  it('should set isLoading to true and reset error to null when rejected is dispatched', () => {
    const actualState = ingredientsReducer(
      { ...initialState },
      getIngredients.rejected(null, '')
    );

    expect(actualState).toEqual({
      data: [],
      status: RequestStatus.Failed
    });
  });
});
