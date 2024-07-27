// src\services\ingredientsSlice.test.ts

import ingredientsReducer, {
  initialState,
  setBuns,
  setMains,
  setSauces,
  setLoading,
  setError
} from './ingredientsSlice';
import { TIngredient } from '../utils/types';
import { ThunkMiddleware } from 'redux-thunk';

describe('ingredientsSlice', () => {
  const testIngredient: TIngredient = {
    _id: '1',
    name: 'Ingredient',
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

  it('should handle setLoading action', () => {
    const newState = ingredientsReducer(initialState, setLoading(true));
    expect(newState.isLoading).toBe(true);
  });

  it('should handle setBuns action', () => {
    const buns: TIngredient[] = [{ ...testIngredient, type: 'bun' }];
    const newState = ingredientsReducer(initialState, setBuns(buns));
    expect(newState.buns).toEqual(buns);
  });

  it('should handle setMains action', () => {
    const mains: TIngredient[] = [{ ...testIngredient, type: 'main' }];
    const newState = ingredientsReducer(initialState, setMains(mains));
    expect(newState.mains).toEqual(mains);
  });

  it('should handle setSauces action', () => {
    const sauces: TIngredient[] = [{ ...testIngredient, type: 'sauce' }];
    const newState = ingredientsReducer(initialState, setSauces(sauces));
    expect(newState.sauces).toEqual(sauces);
  });

  it('should handle setError action', () => {
    const newState = ingredientsReducer(initialState, setError(true));
    expect(newState.hasError).toBe(true);
  });
});
