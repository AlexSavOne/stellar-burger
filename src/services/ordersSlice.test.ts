// src\services\ordersSlice.test.ts

import reducer, {
  initialState,
  setOrders,
  clearOrders,
  fetchOrderById,
  getUserOrders
} from './ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle setOrders', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Burger',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      }
    ];
    const total = 100;
    const totalToday = 10;

    const expectedState = {
      ...initialState,
      orders,
      total,
      totalToday
    };

    expect(
      reducer(initialState, setOrders({ orders, total, totalToday }))
    ).toEqual(expectedState);
  });

  it('should handle clearOrders', () => {
    const modifiedState = {
      ...initialState,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Burger',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: []
        }
      ],
      total: 100,
      totalToday: 10
    };

    expect(reducer(modifiedState, clearOrders())).toEqual(initialState);
  });

  it('should handle getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const expectedState = { ...initialState, loading: true };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUserOrders.fulfilled', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Burger',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      }
    ];
    const action = { type: getUserOrders.fulfilled.type, payload: orders };
    const expectedState = { ...initialState, orders, loading: false };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle getUserOrders.rejected', () => {
    const action = {
      type: getUserOrders.rejected.type,
      payload: 'Failed to fetch orders'
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: 'Failed to fetch orders'
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrderById.pending', () => {
    const action = { type: fetchOrderById.pending.type };
    const expectedState = {
      ...initialState,
      loading: true,
      currentOrder: null,
      error: null
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrderById.fulfilled', () => {
    const order: TOrder = {
      _id: '1',
      status: 'done',
      name: 'Burger',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    };
    const action = { type: fetchOrderById.fulfilled.type, payload: order };
    const expectedState = {
      ...initialState,
      loading: false,
      currentOrder: order,
      error: null
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fetchOrderById.rejected', () => {
    const action = {
      type: fetchOrderById.rejected.type,
      error: { message: 'Failed to fetch order details' }
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: 'Failed to fetch order details'
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
