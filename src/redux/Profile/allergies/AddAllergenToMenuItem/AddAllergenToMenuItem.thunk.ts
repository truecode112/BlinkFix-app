import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../../utils/localStorage';
import {instance} from '../../../interceptors';
import {IAddAllergenToMenuItemRTK} from './AddAllergenToMenuItem.type';

export const addAllergyToMenuItemThunk = createAsyncThunk<
  IAddAllergenToMenuItemRTK,
  {menuItemId: string; allergens: number[]}
>(
  'menuItem/AddAllergenToMenuItemSlice/post',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      if (!state) {
        return rejectWithValue('no data provided');
      } else {
        const res = await instance
          .post(
            `/order/establishment/menu/addItemAllergens/${state.menuItemId}`,
            {
              allergens: state.allergens,
            },
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
  },
);
