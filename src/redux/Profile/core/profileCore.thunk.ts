import {Alert} from 'react-native';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {addressType} from '../../Auth/AuthTypes';
import {instance} from '../../interceptors';
import {IResponseGetMyProfile} from '../types';

export const getMyProfile = createAsyncThunk<
  IResponseGetMyProfile,
  {tag?: string | null; category?: string | null} | undefined
>('profile/get}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .get(`/profile`, {
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

export const addAddressToMyProfile = createAsyncThunk<
  IResponseGetMyProfile,
  addressType
>('profile/address/post}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .post(`/profile/address`, state, {
        headers: {Authorization: 'Bearer ' + tokens?.access_token},
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        Alert.alert('Error adding new address', error.response.data.error);
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
