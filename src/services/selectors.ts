// src\services\selectors.ts

import { createSelector } from 'reselect';
import { RootState } from './store';

const selectOrders = (state: RootState) => state.orders;
const selectIngredients = (state: RootState) => state.ingredients;

export const selectAllIngredients = createSelector(
  [selectIngredients],
  (ingredients) => [
    ...ingredients.buns,
    ...ingredients.mains,
    ...ingredients.sauces
  ]
);

export const selectCurrentOrder = createSelector(
  [selectOrders],
  (orders) => orders.currentOrder
);

export const selectUserOrders = createSelector(
  [selectOrders],
  (orders) => orders.orders
);
