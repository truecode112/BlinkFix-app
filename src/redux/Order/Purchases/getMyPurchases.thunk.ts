import {IIngredient} from './../../recipes/types';
import {checkStringNull} from './../../recipes/editRecipe/functions';
import {IEstablishment, IGetAddress, IMenuItem} from './../../Profile/types';
import {getTokensKeychain} from './../../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {instance} from '../../interceptors';
import {IResponseOrderItem, IResponseSlice} from '../Order/types';

interface IOrderItemsChanges {
  ingredientId: IIngredient;
  qtt: number;
  _id: string;
}

export interface orderItemItems {
  itemId: IMenuItem;
  changes: IOrderItemsChanges[];
  _id: string;
}

export interface IInvoice {
  _id: string;
  orderDate: string;
  orderUpdateDate: string;
  orderBy: string;
  orderWhere: IEstablishment;
  orderItems: orderItemItems[];
  orderStatus: string;
  isCompleted: boolean;
  address: IGetAddress;
}

export const GetMyPurchases = createAsyncThunk<IResponseSlice<IInvoice[]>>(
  'Purchases/get/my',
  async (_, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .get(`/order`, {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return rejectWithValue(error.response.data.message);
        });

      return res;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);

export interface IResponseGetNerbayEstablishment {
  error: any | undefined;
  message: string | undefined;
  data?: IEstablishment[] | null;
  isLoading: boolean;
  succes: boolean;
}
