import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../../utils/localStorage';
import {instance} from '../../../interceptors';
import {IAddAllergenToMenuItemRTK} from './AddAllergenToMenuItem.type';

export const getAllergyOfMenuItemThunk = createAsyncThunk<
  IAddAllergenToMenuItemRTK,
  string
>('menuItem/GetAllergenOfMenuItemSlice', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    if (!state) {
      return rejectWithValue('no data provided');
    } else {
      const res = await instance
        .get(
          `/order/establishment/menu/getItemAllergens/${state}`,

          {
            headers: {Authorization: 'Bearer ' + tokens?.access_token},
          },
        )
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.log(error.response.data);
          return rejectWithValue(error.response.data.message);
        });

      return res;
    }
  } catch (error: any) {
    return rejectWithValue({
      message: JSON.stringify(error.response.data.error),
      error: 'login failed',
      data: null,
    });
  }
});
