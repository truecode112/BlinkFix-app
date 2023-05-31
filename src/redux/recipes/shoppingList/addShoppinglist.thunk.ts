import {createAsyncThunk} from '@reduxjs/toolkit';
import {IIngredientShoppingList} from '../../../Pages/signedIn/recipes/AddShoppingListClearPage';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IIngredient, IResponseGetSingleShoppingList} from './../types';

export const addShoppingListThunk = createAsyncThunk<
  IResponseGetSingleShoppingList,
  {
    recipeId: string;
    recipeIngredients: IIngredient[];
    recipeTipIngredients: IIngredient[];
  }
>('shoppingList/add/recipe', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .post(
        `/recipes/shoppingList/${state.recipeId}`,
        {
          recipeIngredients: state.recipeIngredients,
          recipeTipIngredients: state.recipeTipIngredients,
        },
        {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        },
      )
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
export const addClearShoppingListThunk = createAsyncThunk<
  IResponseGetSingleShoppingList,
  {
    ingredients: IIngredientShoppingList[];
  }
>('shoppingList/add/clear', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .post(
        `/recipes/shoppingList`,
        {
          ingredients: state.ingredients,
        },
        {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        },
      )
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
