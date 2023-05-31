import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseGetAllergies} from './getAllergies.thunk';

export const deleteAllergy = createAsyncThunk<IResponseGetAllergies, string>(
  'profile/allergy/delete}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      if (!state) {
        return rejectWithValue('no data provided');
      } else {
        const res = await instance
          .delete(`/profile/allergies/${state}`, {
            headers: {Authorization: 'Bearer ' + tokens?.access_token},
          })
          .then(response => {
            return response.data;
          })
          .catch(error => {
            return rejectWithValue(error.response.data.message);
          });

        return res;
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
