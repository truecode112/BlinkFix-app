import {IEstablishment} from './../../Profile/types';
import {IResponseSlice} from '../..//Order/Order/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {ICounterEstablishmentFinal} from '../../Profile/types';

export const CounterLikeEstablishment = createAsyncThunk<
  IResponseCounterLikeEstablishment,
  string
>('Counters/likeEstablishment}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .post(
        `/user/counter/addLikeToEstablishment/${state}`,
        {},
        {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        },
      )
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

export interface IResponseCounterLikeEstablishment
  extends IResponseSlice<IEstablishment> {
  error: any | undefined;
  message: string | undefined;
  isLoading: boolean;
  succes: boolean;
}
