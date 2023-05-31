import {instance} from '../../../../interceptors';
import {createAsyncThunk} from '@reduxjs/toolkit';
import React from 'react';
import {getTokensKeychain} from '../../../../../utils/localStorage';
import {IResponseLikeMenuItem} from './addMenuItemLike.slice';
import {IResponseGetLikedMenuItems} from './getLikedMenuItems.slice';

export const getLikedMenuItems = createAsyncThunk<IResponseGetLikedMenuItems>(
  'MenuItems/stats}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .get(`/user/counter/menuItemsStatistic`, {
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
