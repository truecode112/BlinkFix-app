import {IEstablishment, IJobsGet} from './../../Profile/types';
import {IGetAddress, IGetProfileInfo} from '../../Profile/types';
import {IRequestOrder, IRequestOrderItem, IResponseSlice} from '../Order/types';

export type IOrderListItem = {
  _id: string;
  orderDate: string;
  orderUpdateDate: string;
  orderBy: IGetProfileInfo;
  orderWhere: IEstablishment;
  orderItems: IRequestOrderItem[];
  isCompleted: boolean;
  isPickup: boolean;
  address: IGetAddress;
  assignedTo: IJobsGet | null;
  allAssignedTo: IJobsGet[] | null;
  totalAmount: number;
  currency: string;
  orderStatus:
    | 'placed'
    | 'canceled'
    | 'took by chef'
    | 'took by waiter'
    | 'took by driver'
    | 'finished'
    | 'confirmed'
    | 'delivered';
  paymentType: string;
  transaction: string;
  forwardedTo: 'waiter' | 'driver' | 'chef';
};

export interface IEstablishmentOrderData {
  establishment: string;
  orders: IOrderListItem[];

  //
}

export interface IEstablishmentOrder
  extends IResponseSlice<IEstablishmentOrderData[] | null> {
  //
}

export const initialState: IEstablishmentOrder = {
  data: null,
  error: null,
  isLoading: false,
  message: null,
  succes: false,
  //
};
