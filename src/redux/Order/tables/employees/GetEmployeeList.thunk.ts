import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../../utils/localStorage';
import {instance} from '../../../interceptors';
import {IGetProfileInfo} from '../../../Profile/types';

export const GetEmployeeList = createAsyncThunk<
  IResponseGetEmployeeList,
  string
>('Establishment/GetEmployeeList/get}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .get(`/profile/workspace/${state}`, {
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
});

export interface IDataInterface {
  employees: IWorkspaceEmployeeList[] | null;
  _id: string;
}

export interface IResponseGetEmployeeList {
  error: any | undefined;
  message: string | undefined;
  data?: IDataInterface[] | null;
  isLoading: boolean;
  succes: boolean;
}

export interface IWorkspaceEmployeeList {
  _id: string;
  typeOfWork: string;
  workerId: IGetProfileInfo;
  workPlace: string;
  startOfWork: string;
  endOfWork: string | null;
  isConfirmed: boolean;
  orders: IOrder[];
  worker: IGetProfileInfo;
  workerStatus:
    | 'free'
    | 'off'
    | 'driver at restaurant'
    | 'Order sent to chef'
    | 'Order Served'
    | 'Order recived'
    | 'Order redy to pick up';
  __v: 0;
}

export interface IOrder {}
