import {IEstablishmentOrder} from './EstablishmentOrder.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';

const requestUri: string = '/order/establishment/';
const thunkName: string = 'EstablishmentOrderGet';

//TODO: add this to My establishment slice
export const EstablishmentOrderThunk = createAsyncThunk<IEstablishmentOrder>(
  thunkName,
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .get(requestUri, {
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
        error: '',
        data: null,
      });
    }
  },
);
