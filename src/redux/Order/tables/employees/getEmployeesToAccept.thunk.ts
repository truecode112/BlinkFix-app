import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../../utils/localStorage';
import {instance} from '../../../interceptors';
import {IGetProfileInfo} from '../../../Profile/types';

export const EmpoyeesToAccept = createAsyncThunk<
  IResponseGetEmployeesToAccept,
  string
>('Establishment/EmpoyeesToAccept/get}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .get(`/profile/workspace/employeesToConfirm/${state}`, {
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

export interface IResponseGetEmployeesToAccept {
  error: any | undefined;
  message: string | undefined;
  data?: IWorkspaceEmployee[] | null;
  isLoading: boolean;
  succes: boolean;
}

export interface IWorkspaceEmployee {
  _id: string;
  typeOfWork: string;
  workerId: IGetProfileInfo;
  workPlace: string;
  startOfWork: string;
  endOfWork: string | null;
  isConfirmed: boolean;
  orders: IOrder[];
  __v: 0;
}

export interface IOrder {}
