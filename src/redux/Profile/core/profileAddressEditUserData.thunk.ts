import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IGetAddress, IResponseGetMyProfile} from '../types';

export const editMyProfileAddress = createAsyncThunk<
  IResponseGetMyProfile,
  {
    address: IGetAddress | undefined | null;
    id: string | null | undefined;
  }
>('profile/address/put}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    if (!state) {
      return rejectWithValue('no data provided');
    }
    if (!state.id || !state.address) {
      return rejectWithValue('no data provided');
    } else {
      const res = await instance
        .put(`/profile/address/${state.id}/${state.address._id}`, state, {
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
});
