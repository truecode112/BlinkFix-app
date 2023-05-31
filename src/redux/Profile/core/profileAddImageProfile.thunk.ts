import {createAsyncThunk} from '@reduxjs/toolkit';
import {ImagePickerResponse} from 'react-native-image-picker';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseGetMyProfile, IGetImages} from '../types';

export const addMyProfileImage = createAsyncThunk<
  IResponseGetMyProfile,
  FormData
>('profile/image/post}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance

      .post(`/profile/profileImage`, state, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
          'Content-Type': 'multipart/form-data',
        },
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
