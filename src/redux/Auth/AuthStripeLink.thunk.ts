import {IResponseSlice} from './../Order/Order/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export interface IAccountLink {
  created: number;
  expires_at: number;
  url: string;
}

export interface IGetStripeLink
  extends IResponseSlice<{
    created: number;
    expires_at: number;
    object: string;
    url: string;
  } | null> {}

/**
 * pass stripe account id to get stripe link
 */
export const getStripeAccountLink = createAsyncThunk<IGetStripeLink, string>(
  'user/stripe/Link',
  async (state, {rejectWithValue}) => {
    try {
      const res = await axios
        .get(`/user/stripe/${state}`)
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.error(error.response.data);

          return rejectWithValue(error.response.data.message);
        });

      return res;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
