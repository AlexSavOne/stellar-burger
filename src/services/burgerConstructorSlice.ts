// stellar-burgers\src\services\burgerConstructorSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '../utils/types';
import { orderBurgerApi, TNewOrderResponse } from '../utils/burger-api';

interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
}

export const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const placeOrder = createAsyncThunk(
  'burgerConstructor/placeOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setConstructorItems(
      state,
      action: PayloadAction<TConstructorIngredient | TConstructorIngredient[]>
    ) {
      if (Array.isArray(action.payload)) {
        state.constructorItems.ingredients.push(...action.payload);
      } else if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0) {
        const temp = state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
    },
    setOrderModalData(state, action: PayloadAction<TOrder>) {
      state.orderModalData = action.payload;
    },
    clearOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(
        placeOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload.order;
          state.constructorItems = initialState.constructorItems;
        }
      )
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
      });
  }
});

export const {
  setConstructorItems,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  setOrderModalData,
  clearOrderModalData
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
