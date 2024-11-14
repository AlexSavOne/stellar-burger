// src\services\burgerConstructorSlice.test.ts

import burgerConstructorReducer, {
  initialState,
  setConstructorItems,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const testIngredient: TConstructorIngredient = {
    _id: '1',
    id: '1',
    name: 'Bun',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    price: 50,
    image: 'image',
    image_large: 'image_large',
    image_mobile: 'image_mobile'
  };

  it('should handle adding an ingredient', () => {
    const newState = burgerConstructorReducer(
      initialState,
      setConstructorItems(testIngredient)
    );
    expect(newState.constructorItems.bun).toEqual(testIngredient);
  });

  it('should handle removing an ingredient', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [testIngredient]
      }
    };
    const newState = burgerConstructorReducer(
      stateWithIngredient,
      removeIngredient(0)
    );
    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  it('should handle moving an ingredient up', () => {
    const ingredients: TConstructorIngredient[] = [
      { ...testIngredient, id: '1', name: 'Ingredient 1' },
      { ...testIngredient, id: '2', name: 'Ingredient 2' }
    ];
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients
      }
    };
    const newState = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      { ...testIngredient, id: '2', name: 'Ingredient 2' },
      { ...testIngredient, id: '1', name: 'Ingredient 1' }
    ]);
  });

  it('should handle moving an ingredient down', () => {
    const ingredients: TConstructorIngredient[] = [
      { ...testIngredient, id: '1', name: 'Ingredient 1' },
      { ...testIngredient, id: '2', name: 'Ingredient 2' }
    ];
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients
      }
    };
    const newState = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      { ...testIngredient, id: '2', name: 'Ingredient 2' },
      { ...testIngredient, id: '1', name: 'Ingredient 1' }
    ]);
  });
});
