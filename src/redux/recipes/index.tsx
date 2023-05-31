import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponseRecipes} from '../Auth/AuthTypes';
import {
  getAllRecipes,
  getAllRecipesByCategory,
  getAllRecipesByCuisine,
} from './recipesThunks';
import {addRecipeThunk} from './addRecipe/addRecipe.thunk';
import {IRecipe} from './types';
import {editRecipeThunk} from './editRecipe/editRecipe.thunk';
import {
  IResponsePostLikeRecipe,
  LikeRecipeThunk,
} from '../counters/favourites/Recipes/Favourites.thunk';

const initialState: IResponseRecipes = {
  error: '',
  message: '',
  data: [],
  isLoading: false,
  succes: false,
};

const Recipes = createSlice({
  name: 'Recipes',
  initialState,
  reducers: {
    cleanUpRecipes: state => {
      state.data = [];
      state.message = undefined;
      state.isLoading = false;
      state.succes = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(getAllRecipes.rejected, (state, {payload}: AnyAction) => {
      state.isLoading = false;
      state.error = payload;
      state.succes = false;
      state.data = null;
    });
    builder.addCase(getAllRecipes.fulfilled, (state, {payload}: AnyAction) => {
      state.data = payload.data;
      state.message = payload.message;
      state.isLoading = false;
      state.succes = true;
    });
    builder.addCase(getAllRecipes.pending, (state, action: AnyAction) => {
      state.isLoading = true;
      state.succes = false;
    });
    builder.addCase(addRecipeThunk.fulfilled, (state, {payload}) => {
      state.error = null;
      state.succes = true;
      if (state.data && payload.data) {
        state.data.push(payload.data);
      }
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(editRecipeThunk.fulfilled, (state, {payload}) => {
      state.error = null;
      state.succes = true;
      console.info({payload: payload});
      console.info({state: state.data});
      if (state.data && payload.data) {
        console.info({payload: payload.data._id});
        state.data = state.data?.map(recipe =>
          recipe._id === payload.data?._id ? payload.data : recipe,
        );
      }
      state.isLoading = false;
      state.message = payload.message;
    });
    ///
    builder.addCase(
      LikeRecipeThunk.fulfilled,
      (state, {payload}: PayloadAction<IResponsePostLikeRecipe>) => {
        state.error = null;
        state.succes = true;

        state.isLoading = false;
        state.message = payload.message;
        if (state.data) {
          const data = state.data;
          const dataMapped: IRecipe[] = data?.map(recipe =>
            recipe._id === payload.data?._id ? payload.data : recipe,
          );
          state.data = dataMapped;
        }
      },
    );
  },
});

export const getRecipes = () =>
  useSelector((state: RootState) => state.recipes.data);

export const getStatus = () =>
  useSelector((state: RootState) => state.login.succes);

export const getRecipesErrors = () =>
  useSelector((state: RootState) => state.recipes.error?.message);

export const {cleanUpRecipes} = Recipes.actions;

export default Recipes.reducer;
