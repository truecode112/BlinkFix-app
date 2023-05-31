import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IIMageRecipe, IResponseAddRecipe} from '../types';
import {IResponseGetMyEstablishmentMenus} from '../../Profile/establishmentMenus/types';
import {ImagePickerResponse} from 'react-native-image-picker';

export interface IManualEdit {
  _id?: string | null;
  stepNumber?: string;
  description?: string;
  imageUrl?: ImagePickerResponse;
  index?: string | null;
}

export interface IIngredientEdit {
  qtt: string;
  name: string;
  unit: string;
  id?: string;
  index?: string | null;
}

export interface IEditRecipe {
  title: string;
  description: string;
  dishesType: string;
  cuisineCode: string;
  advancement: 1 | 2 | 3 | 4 | 5 | null;
  prepTime: string;
  cookTime: string;
  serves: string;
  ingredientsList: IIngredientEdit[];
  manualList: IManualEdit[];
  tipTitle: string;
  tipDescription: string;
  tipIngredientsList: IIngredientEdit[];
  tipManualList: IManualEdit[];
  tags: string[];
  isKosher: boolean;
  isHalal: boolean;
  isVegan: boolean;
  spiceness: 'extra hot' | 'Hot' | 'Mild' | 'normal';
  image: IIMageRecipe;
}

export const editRecipeThunk = createAsyncThunk<
  IResponseAddRecipe,
  {data: IEditRecipe; recipeId: string}
>('recipes/editRecipe', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .put(`/recipes/recipe/${state.recipeId}`, state.data, {
        headers: {Authorization: 'Bearer ' + tokens?.access_token},
      })
      .then(response => {
        console.info('running dispatch to edit recipe');
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
});
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
