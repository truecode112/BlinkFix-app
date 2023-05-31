import {IRecipe} from './../../recipes/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponseSlice} from '../../Order/Order/types';
import {ICounter} from '../../recipes/types';
import {GetLikedRecipes} from './Favourites.thunk';
import {
  IResponsePostLikeRecipe,
  LikeRecipeThunk,
} from './Recipes/Favourites.thunk';

const initialState: IResponseSlice<IRecipe[] | null> = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyFavouritesRecipesSlice = createSlice({
  name: 'LikedRecipes',
  initialState,
  reducers: {
    cleanUpEstablishment: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(GetLikedRecipes.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      GetLikedRecipes.fulfilled,
      (state, {payload}: PayloadAction<any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(GetLikedRecipes.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    builder.addCase(
      LikeRecipeThunk.fulfilled,
      (state, {payload}: PayloadAction<IResponsePostLikeRecipe>) => {
        state.error = null;
        state.succes = true;

        state.isLoading = false;
        state.message = payload.message;

        if (state.data) {
          const data = state.data?.map(recipe =>
            recipe._id === payload.data?._id ? payload.data : recipe,
          );

          state.data = data;
        }
      },
    );
    ////////////////////////////////////////////////////////////////
  },
});

export const {cleanUpEstablishment} = MyFavouritesRecipesSlice.actions;
export default MyFavouritesRecipesSlice.reducer;
