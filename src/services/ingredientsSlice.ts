// src/services/ingredientsSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

interface IngredientsState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  ingredients: TIngredient[];
  selectedIngredient: TIngredient | null;
  isLoading: boolean;
  hasError: boolean;
}

export const initialState: IngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  ingredients: [],
  selectedIngredient: null,
  isLoading: false,
  hasError: false
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
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
