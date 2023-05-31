import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IMyWalletFound, IMyWalletSlice} from './walet.slice';

export const getMyWallet = createAsyncThunk<IMyWalletSlice>(
  'profile/invoices/recipes',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .get(`/profile/wallet`, {
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
  },
);

export const createNewWallet = createAsyncThunk<IMyWalletSlice>(
  'profile/wallet/create',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .post(`/profile/wallet`, {
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
  },
);

export const addFounds = createAsyncThunk<IMyWalletSlice, IMyWalletFound>(
  'profile/wallet/founds/add',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .post(`/profile/wallet/founds`, state, {
          headers: {
            Authorization: 'Bearer ' + tokens?.access_token,
            'Content-Type': 'application/json',
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
  },
);
