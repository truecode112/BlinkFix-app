import {ITable} from './../../Profile/types';
import {instance} from './../../interceptors';
import {getTokensKeychain} from './../../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponseAddNewTable} from '../order.thunk';

export const DeleteTableEstablishment = createAsyncThunk<
  IResponseAddNewTable,
  {establishmentId: string; tableSetId: string}
>('Establishment/table/delete', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .delete(
        `/order/establishment/tables/${state.establishmentId}/${state.tableSetId}`,
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
