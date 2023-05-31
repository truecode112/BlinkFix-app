import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseSlice} from '../Order/types';

export interface IResponseLocationByAddress
  extends IResponseSlice<{lat: string; lng: string} | null> {}

export const getLocationByAddress = createAsyncThunk<
  IResponseLocationByAddress,
  string
>('Establishment/get/nerbay}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .get(`/order/establishment/address/"${state}"`, {
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
