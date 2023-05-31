import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../utils/localStorage';
import {instance} from '../interceptors';
import {IEstablishment, ITable} from '../Profile/types';

//TODO: add this to My establishment slice
export const GetEstablishment = createAsyncThunk<IResponseGetMyEstablishment>(
  'Establishment/get}',
  async (_, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .get(`/profile/establishment`, {
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

export interface IResponseGetMyEstablishment {
  error: any | undefined;
  message: string | undefined;
  data?: IEstablishment[] | null;
  isLoading: boolean;
  succes: boolean;
}
export interface IResponseAddNewTable {
  error: any | undefined;
  message: string | undefined;
  data?: ITable[] | null;
  isLoading: boolean;
  succes: boolean;
}
