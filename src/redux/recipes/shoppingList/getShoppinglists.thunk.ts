import {IRecipe} from './../types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';

export interface IIngredientShoppingList {
  isDone: boolean;
  qtt: number;
  unit: string;
  name: string;
  _id: string;
}
export interface IShoppingList {
  _id: string;
  owner: string;
  recipeId: string;
  ingredients: IIngredientShoppingList[];
  tipIngredients: IIngredientShoppingList[];
  createdAt: string;
  updatedAt: string;
}
export interface IResponseGetShoppingLists {
  data?: {shoppingList: IShoppingList; recipe?: IRecipe}[] | null;
  error: any | undefined;
  message: string | undefined;
  isLoading: boolean;
  succes: boolean;
}

export const getShoppinglists = createAsyncThunk<IResponseGetShoppingLists>(
  '/recipes/shoppingList/get',
  async (_, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance
        .get(`/recipes/shoppingLists`, {
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
