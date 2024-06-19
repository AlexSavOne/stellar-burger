// файл: stellar-burgers\src\services\ingredientsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';

interface IngredientsState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  selectedIngredient: TIngredient | null;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  selectedIngredient: null,
  isLoading: false,
  hasError: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setBuns: (state, action: PayloadAction<TIngredient[]>) => {
      state.buns = action.payload;
    },
    setMains: (state, action: PayloadAction<TIngredient[]>) => {
      state.mains = action.payload;
    },
    setSauces: (state, action: PayloadAction<TIngredient[]>) => {
      state.sauces = action.payload;
    },
    setSelectedIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    }
  }
});

export const {
  setBuns,
  setMains,
  setSauces,
  setSelectedIngredient,
  setLoading,
  setError
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
