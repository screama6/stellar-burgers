import {
  addToConstructor,
  constructorSliceReducer,
  initialState,
  removeFromConstructor,
  reorderConstructor,
  TConstructorState
} from './constructorSlice';

describe('constructorSlice', () => {
  const ingredient1 = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const ingredient2 = {
    id: '2',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const initialStateTest = {
    bun: null,
    ingredients: [{ ...ingredient1, id: '1' }, ingredient2]
  };

  it('обработку экшена добавления ингредиента', () => {
    const ingredientEqual1 = { ...ingredient1, id: expect.any(String) };

    const newState = constructorSliceReducer(
      initialState,
      addToConstructor(ingredient1)
    );

    const ingredients = newState.ingredients;

    expect(ingredients).toEqual([ingredientEqual1]);
  });

  it('обработку экшена удаления ингредиента', () => {
    const newState = constructorSliceReducer(
      initialStateTest,
      removeFromConstructor(1)
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([initialStateTest.ingredients[0]]);
  });

  it('обработку экшена изменения порядка ингредиентов в начинке', () => {
    const initialStateReorder = [ingredient2, { ...ingredient1, id: '1' }];

    const newState = constructorSliceReducer(
      initialStateTest,
      reorderConstructor({ from: 0, to: 1 })
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual(initialStateReorder);
  });
});
