import {getTokensKeychain} from './../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  IResponseRecipeDelete,
  IResponseRecipes,
  IResponseRecipesByTag,
} from '../Auth/AuthTypes';
import {instance} from '../interceptors';

export interface ISearchRecipes {
  access_token: string | undefined;
}

export const getAllRecipes = createAsyncThunk<
  IResponseRecipes,
  {cuisine: string | null; category: string | null} | undefined
>('recipes/get', async (state, {rejectWithValue}) => {
  try {
    const token = await getTokensKeychain();

    const tokenAuth = `Bearer ${token?.access_token}`;
    if (state) {
      const {category, cuisine} = state;
      let QueryString = '?';
      if (category) {
        QueryString += 'category=' + category;
        if (cuisine) {
          QueryString += '&cuisine=' + cuisine;
        }
      } else if (cuisine) QueryString += 'cuisine=' + cuisine;
      else QueryString = '';

      const res = await instance
        .get(`/recipes/recipe/${QueryString}`, {
          headers: {
            Authorization: tokenAuth,
          },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return rejectWithValue(error.response.data);
        });
      return res;
    }

    const res = await instance
      .get('/recipes/recipe', {
        headers: {
          Authorization: tokenAuth,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    return res;
  } catch (error: any) {
    return rejectWithValue({
      message: error,
      error: error,
      data: null,
    });
  }
});

export const getAllRecipesByTag = createAsyncThunk<
  IResponseRecipesByTag,
  string
>('recipes/getByTag', async (tag, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance

      .get(`/recipes/findByTag/${tag}`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    return res;
  } catch (error: any) {
    return rejectWithValue({
      message: error,
      error: 'login failed',
      data: null,
    });
  }
});
export const getAllRecipesByCategory = createAsyncThunk<
  IResponseRecipesByTag,
  string
>('recipes/getByCategory', async (tag, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance

      .get(`/recipes/findByTag/${tag}`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    return res;
  } catch (error: any) {
    return rejectWithValue({
      message: error,
      error: 'login failed',
      data: null,
    });
  }
});
export const getAllRecipesByCuisine = createAsyncThunk<
  IResponseRecipesByTag,
  string
>('recipes/getByCuisine', async (cuisine, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance

      .get(`/recipes/findByTag/${cuisine}`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return rejectWithValue(error.response.data);
      });
    return res;
  } catch (error: any) {
    return rejectWithValue({
      message: error,
      error: 'login failed',
      data: null,
    });
  }
});

export const deleteRecipe = createAsyncThunk<IResponseRecipeDelete, string>(
  'recipes/getByCategory',
  async (recipeId, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      const res = await instance

        .delete(`/recipes/recipe/${recipeId}`, {
          headers: {
            Authorization: 'Bearer ' + tokens?.access_token,
          },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return rejectWithValue(error.response.data);
        });
      return res;
    } catch (error: any) {
      return rejectWithValue({
        message: error,
        error: 'login failed',
        data: null,
      });
    }
  },
);
