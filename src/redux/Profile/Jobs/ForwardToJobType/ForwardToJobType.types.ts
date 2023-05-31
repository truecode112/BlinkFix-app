import {IOrderListItem} from './../../../Order/EstablishmentOrder/EstablishmentOrder.types';
import {IResponseSlice} from '../../../Order/Order/types';

export interface IForwardToJobTypeData {
  //
}

export interface IForwardToJobType
  extends IResponseSlice<IOrderListItem | null> {
  //
}

export const initialState: IForwardToJobType = {
  data: null,
  error: null,
  isLoading: false,
  message: null,
  succes: false,
  //
};
