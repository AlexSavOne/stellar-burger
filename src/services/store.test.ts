// src/__tests__/store.test.ts

import { rootReducer } from '../services/store';
import { initialState as authInitialState } from '../services/authSlice';
import { initialState as ingredientsInitialState } from '../services/ingredientsSlice';
import { initialState as ordersInitialState } from '../services/ordersSlice';
import { initialState as burgerConstructorInitialState } from '../services/burgerConstructorSlice';

const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(() => null)
};

global.localStorage = localStorageMock;

describe('rootReducer', () => {
  it('should return the initial state for the rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      auth: authInitialState,
      ingredients: ingredientsInitialState,
      orders: ordersInitialState,
      burgerConstructor: burgerConstructorInitialState
    });
  });

  it('should handle unknown actions', () => {
    const initialState = {
      auth: authInitialState,
      ingredients: ingredientsInitialState,
      orders: ordersInitialState,
      burgerConstructor: burgerConstructorInitialState
    };

    const state = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });
});
