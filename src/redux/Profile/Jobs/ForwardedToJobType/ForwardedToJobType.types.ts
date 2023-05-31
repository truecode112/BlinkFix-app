import {IOrderListItem} from './../../../Order/EstablishmentOrder/EstablishmentOrder.types';
import {IResponseSlice} from '../../../Order/Order/types';

export interface IForwardedToJobTypeData {
  //
}

export interface IForwardedToJobType
  extends IResponseSlice<IOrderListItem[] | null> {
  //
}

export const initialState: IForwardedToJobType = {
  data: null,
  error: null,
  isLoading: false,
  message: null,
  succes: false,
  //
};
