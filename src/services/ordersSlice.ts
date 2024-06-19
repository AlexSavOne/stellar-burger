import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../utils/burger-api';
import { getOrderByNumberApi } from '../utils/burger-api';

interface OrdersState {
  orders: TOrder[];
  currentOrder: TOrder | null;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

interface OrdersPayload {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: number) => {
    const response = await getOrderByNumberApi(orderId);
    return response.orders[0];
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<OrdersPayload>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    clearOrders(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.currentOrder = null;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch order details';
      });
  }
});

export const { setOrders, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
