import {editRecipeThunk} from './../editRecipe/editRecipe.thunk';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRecipe, IResponseGetMyRecipes} from '../types';
import {getMyRecipes} from './myRecipes.thunk';
import {deleteRecipe} from '../recipesThunks';
import {
  IResponsePostLikeRecipe,
  LikeRecipeThunk,
} from '../../counters/favourites/Recipes/Favourites.thunk';

const initialState: IResponseGetMyRecipes = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyRecipes = createSlice({
  name: 'myRecipes',
  initialState,
  reducers: {
    cleanUpAddRecipe: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMyRecipes.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(getMyRecipes.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.data = payload.data;
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(getMyRecipes.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ///
    builder.addCase(deleteRecipe.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.data = payload.data;
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(deleteRecipe.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    builder.addCase(editRecipeThunk.fulfilled, (state, {payload}) => {
      state.error = null;
      state.succes = true;
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
        if (state.data && payload.data) {
          const data = state.data;
          const dataMapped: IRecipe[] = data.map(singleRecipe =>
            singleRecipe._id === payload.data?._id
              ? payload.data
              : singleRecipe,
          );
          state.data = dataMapped;
        }
      },
    );
  },
});

export const getMyRecipesError = () =>
  useSelector((state: RootState) => state.myRecipes.error);
export const {cleanUpAddRecipe} = MyRecipes.actions;
export default MyRecipes.reducer;
