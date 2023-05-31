import {createAsyncThunk} from '@reduxjs/toolkit';
import {CreateInterfaceType} from '../../../../Pages/signedIn/menupages/establishment/establishment.types';
import {getTokensKeychain} from '../../../../utils/localStorage';
import {instance} from '../../../interceptors';
import {ResponseFromCreateEstablishment} from './types';

export const CreateEstablishmentThunk = createAsyncThunk<
  ResponseFromCreateEstablishment,
  CreateInterfaceType
>('Establishment/create}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .post(`/order/establishment/add`, state, {
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
