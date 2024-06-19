// src/pages/feed/feed.tsx

import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { getFeedsApi } from '../../utils/burger-api';
import { setOrders } from '../../services/ordersSlice';
import { RootState } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.orders);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getFeedsApi();
      dispatch(
        setOrders({
          orders: data.orders,
          total: data.total,
          totalToday: data.totalToday
        })
      );
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [dispatch]);

  const handleGetFeeds = () => {
    fetchOrders();
  };

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
