import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IGetProfileInfo, IResponseGetMyProfile} from '../types';

export const editMyProfile = createAsyncThunk<
  IResponseGetMyProfile,
  IGetProfileInfo | undefined | null
>('profile/put}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    if (!state) {
      return rejectWithValue('no data provided');
    }
    const res = await instance
      .put(`/profile`, state, {
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
