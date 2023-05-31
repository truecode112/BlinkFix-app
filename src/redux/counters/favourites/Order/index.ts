import {IRecipe} from '../../../recipes/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {instance} from '../../../interceptors';
import {IEstablishment} from '../../../Profile/types';

export const LikedEstablishmentThunk =
  createAsyncThunk<IResponsePostGetLikedOrder>(
    'Order/establishment/liked/get}',
    async (state, {rejectWithValue}) => {
      try {
        const res = await instance
          .get(`/order/establishment/favourites`)
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.warn(error.response.data);
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

export interface IResponsePostGetLikedOrder {
  error: any | undefined;
  message: string | undefined;
  data: IEstablishment[] | null;
  isLoading: boolean;
  succes: boolean;
}
