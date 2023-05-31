import {instance} from '../../../../interceptors';
import {createAsyncThunk} from '@reduxjs/toolkit';
import React from 'react';
import {getTokensKeychain} from '../../../../../utils/localStorage';
import {IResponseLikeMenuItem} from './addMenuItemLike.slice';

export const AddMenuItemLike = createAsyncThunk<IResponseLikeMenuItem, string>(
  'MenuItems/like}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .post(`/user/counter/addLikeToEstablishmentMenuItem/${state}`, {
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
