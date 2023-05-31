import {IEstablishment, IJobsGet} from '../../Profile/types';
import {IRequestOrderItem, IResponseSlice} from '../../Order/Order/types';
import {orderItemItems} from '../../Order/Purchases/getMyPurchases.thunk';
import {ICartItemItem} from '../../Order/shoppingCart.slice';

export interface IWaiterOrderData {
  //
}

export interface IWaiterOrder
  extends IResponseSlice<
    | {
        orderWhere: string;
        orderItems: ICartItemItem;
        establishment: IEstablishment;
      }[]
    | null
  > {
  //
}

export const initialState: IWaiterOrder = {
  data: [],
  error: null,
  isLoading: false,
  message: null,
  succes: false,
  //
};
