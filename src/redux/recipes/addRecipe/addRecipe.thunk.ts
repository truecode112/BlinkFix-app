import {IRecipeAdd} from './../../../Pages/signedIn/recipes/Recipesadd';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseAddRecipe} from './../types';
import {IResponseRegisterResponse} from '../../Auth/AuthTypes';
import {IResponseGetMyEstablishmentMenus} from '../../Profile/establishmentMenus/types';

export const addRecipeThunk = createAsyncThunk<IResponseAddRecipe, IRecipeAdd>(
  'recipes/addRecipe',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .post('/recipes/recipe', state, {
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
      console.error(error);
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
export const addRecipeMainImageThunk = createAsyncThunk<
  IResponseGetMyEstablishmentMenus,
  {recipeId: string; image: FormData}
>('recipes/addMainImageToRecipe/post}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .post(`/recipes/addPhotoToRecipe/${state.recipeId}`, state.image, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
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
