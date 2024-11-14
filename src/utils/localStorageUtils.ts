// src/utils/localStorageUtils.ts

import { TUser } from './types';
import { setCookie } from './cookie';

export const getUserFromLocalStorage = (): TUser | null => {
  const userJSON = localStorage.getItem('user');
  return userJSON ? JSON.parse(userJSON) : null;
};

export const setUserToLocalStorage = (
  user: TUser,
  refreshToken: string,
  accessToken: string
) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('accessToken', accessToken);
  setCookie('accessToken', accessToken, { expires: 3600 });
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
};
