// src/services/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  TLoginData,
  TRegisterData
} from '../utils/burger-api';
import { TUser } from '../utils/types';
import { RootState } from './store';
import {
  setUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage
} from '../utils/localStorageUtils';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';

interface AuthState {
  isAuthenticated: boolean;
  user: TUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('refreshToken'),
  user: getUserFromLocalStorage(),
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setUserToLocalStorage(
      response.user,
      response.refreshToken,
      response.accessToken
    );
    setCookie('accessToken', response.accessToken, { expires: 3600 });
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setUserToLocalStorage(
      response.user,
      response.refreshToken,
      response.accessToken
    );
    setCookie('accessToken', response.accessToken, { expires: 3600 });
    return response;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  removeUserFromLocalStorage();
  deleteCookie('accessToken');
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const user = getUserFromLocalStorage();
    const accessToken = getCookie('accessToken');

    if (user && accessToken) {
      try {
        const response = await getUserApi();
        return response.user;
      } catch (error) {
        removeUserFromLocalStorage();
        deleteCookie('accessToken');
        throw new Error('Ошибка аутентификации пользователя');
      }
    } else {
      removeUserFromLocalStorage();
      deleteCookie('accessToken');
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      setUserToLocalStorage(
        action.payload.user,
        action.payload.refreshToken,
        action.payload.accessToken
      );
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      removeUserFromLocalStorage();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось войти';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось зарегистрироваться';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось выйти';
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось загрузить пользователя';
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error =
          action.error.message || 'Не удалось проверить аутентификацию';
      });
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
