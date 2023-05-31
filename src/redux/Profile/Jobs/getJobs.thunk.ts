import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IGetProfileInfo, IResponseGetMyProfile} from '../types';

export const getJobRequests = createAsyncThunk<IResponseGetMyProfile>(
  'profile/job/get}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .get(`/profile/job`, {
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
  },
);
