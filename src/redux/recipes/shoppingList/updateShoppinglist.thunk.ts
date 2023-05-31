import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IRecipe} from '../types';
import {IIngredientShoppingList, IShoppingList} from './getShoppinglists.thunk';

export interface IResponseGetSingleShoppingLists {
  data?: {shoppingList: IShoppingList; recipe?: IRecipe} | null;
  error: any | undefined;
  message: string | undefined;
  isLoading: boolean;
  succes: boolean;
}

export const editShoppingListThunk = createAsyncThunk<
  IResponseGetSingleShoppingLists,
  {
    shoppingListId: string;
    recipeIngredients: IIngredientShoppingList[];
    recipeTipIngredients: IIngredientShoppingList[];
  }
>('shoppingList/update', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .put(
        `/recipes/shoppingList/${state.shoppingListId}`,
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
    console.error(error);
    return rejectWithValue({
      message: error.message,
      error: 'login failed',
      data: null,
    });
  }
});
