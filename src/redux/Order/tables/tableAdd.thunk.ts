import {ITable} from './../../Profile/types';
import {instance} from './../../interceptors';
import {getTokensKeychain} from './../../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponseAddNewTable} from '../order.thunk';

export const AddTableToEstablishment = createAsyncThunk<
  IResponseAddNewTable,
  {establishmentId: string; table: ITable}
>('Establishment/table/post', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    if (
      state.table.numberOfPlaces === '' ||
      state.table.numberOfTables == '' ||
      state.table.tableName === '' ||
      state.table.tableShape === ''
    )
      return rejectWithValue('Data provided is invalid');

    const res = await instance
      .post(
        `/order/establishment/tables/${state.establishmentId}`,
        state.table,
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
