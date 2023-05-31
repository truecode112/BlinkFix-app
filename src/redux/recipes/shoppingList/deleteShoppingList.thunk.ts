import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {
  IResponseAddShoppingList,
  IResponseGetSingleShoppingList,
  ShoppingListItem,
} from '../types';
import {IResponseGetShoppingLists} from './getShoppinglists.thunk';

export const deleteShoppingListThunk = createAsyncThunk<
  IResponseGetShoppingLists,
  string
>('shoppingList/delete', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .delete(`/recipes/shoppingList/${state}`, {
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
    console.error(error);
    return rejectWithValue({
      message: error.message,
      error: 'login failed',
      data: null,
    });
  }
});
