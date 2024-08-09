import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getFeed } from '../../services/slices/feedSlice/feedSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  //const orders = useSelector(selectorOrders);
  let orders = useSelector((state: RootState) => state.feed.orders);
  const dispatch = useDispatch();
  const updateFeed = () => {
    dispatch(getFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={updateFeed} />;
};
