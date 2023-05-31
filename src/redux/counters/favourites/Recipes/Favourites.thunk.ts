import {IRecipe} from './../../../recipes/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {instance} from '../../../interceptors';

export const LikeRecipeThunk = createAsyncThunk<
  IResponsePostLikeRecipe,
  string
>('recipe/like}', async (state, {rejectWithValue}) => {
  try {
    const res = await instance
      .post(`/recipes/counter/addLike/${state}`)
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
});

export interface IResponsePostLikeRecipe {
  error: any | undefined;
  message: string | undefined;
  data: IRecipe | null;
  isLoading: boolean;
  succes: boolean;
}
