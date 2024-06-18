// файл: stellar-burgers\src\services\ingredientsActions.ts

import { Dispatch } from 'redux';
import {
  setBuns,
  setMains,
  setSauces,
  setLoading,
  setError
} from './ingredientsSlice';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

export const fetchIngredients = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(false));
  try {
    const ingredients = await getIngredientsApi();
    dispatch(
      setBuns(
        ingredients.filter(
          (ingredient: TIngredient) => ingredient.type === 'bun'
        )
      )
    );
    dispatch(
      setMains(
        ingredients.filter(
          (ingredient: TIngredient) => ingredient.type === 'main'
        )
      )
    );
    dispatch(
      setSauces(
        ingredients.filter(
          (ingredient: TIngredient) => ingredient.type === 'sauce'
        )
      )
    );
  } catch (error) {
    dispatch(setError(true));
  } finally {
    dispatch(setLoading(false));
  }
};
