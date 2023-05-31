import {IRecipe} from './../../recipes/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';

export const GetLikedRecipes = createAsyncThunk<IResponseGetLikedRecipes>(
  'Establishment/get/nerbay}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .get(`/recipes/recipe/liked`, {
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

export interface IResponseGetLikedRecipes {
  error: any | undefined;
  message: string | undefined;
  data?: IRecipe[] | null;
  isLoading: boolean;
  succes: boolean;
}
