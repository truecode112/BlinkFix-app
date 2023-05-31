import {category} from './../../../components/categorySelector/allCategories';
import {IRecipeAdd} from '../../../Pages/signedIn/recipes/Recipesadd';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseGetMyRecipes} from '../types';

export const getMyRecipes = createAsyncThunk<
  IResponseGetMyRecipes,
  {tag?: string | null; category?: string | null} | undefined
>('recipes/getRecipe}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    if (state?.category) {
      const res = await instance
        .get(`/recipes/findMyRecipes/?category=${state.category}`, {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return rejectWithValue(error.response.data.message);
        });
      return res;
    }
    const res = await instance
      .get(`/recipes/findMyRecipes/`, {
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
