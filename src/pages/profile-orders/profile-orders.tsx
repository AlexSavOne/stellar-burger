// src/pages/profile-orders/profile-orders.tsx

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { getUserOrders } from '../../services/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );
  const loading = useSelector((state: RootState) => state.orders.loading);
  const error = useSelector((state: RootState) => state.orders.error);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (loading) return <Preloader />;
  if (error) return <p>Error: {error}</p>;

  return <ProfileOrdersUI orders={orders} />;
};
