import {getRecipes} from './index';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsLoading} from '../rootReducer';
import {IResponseRecipesByTag} from '../Auth/AuthTypes';
import {getAllRecipesByTag} from './recipesThunks';
import {
  IResponsePostLikeRecipe,
  LikeRecipeThunk,
} from '../counters/favourites/Recipes/Favourites.thunk';
import {ICounter, IRecipe} from './types';

const initialState: IResponseRecipesByTag = {
  error: undefined,
  message: undefined,
  data: {
    filteredRecipesByTag: [],
    filteredRecipesByOwner: [],
    filteredByRecipeName: [],
    filteredByRecipeDescription: [],
    filteredByRecipeCuisine: [],
    filteredByRecipeDinnerType: [],
  },
  isLoading: false,
  succes: false,
};

const RecipesByTag = createSlice({
  name: 'recipesByTag',
  initialState,
  reducers: {
    cleanUpRecipesByTag: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(
      getAllRecipesByTag.rejected,
      (state, {payload}: AnyAction) => {
        state.isLoading = false;
        state.error = payload;
        state.succes = false;
        state.data = undefined;
      },
    );

    builder.addCase(getAllRecipesByTag.fulfilled, (state, {payload}: any) => {
      state.data = payload.data;
      state.message = JSON.stringify(payload.message);
      state.isLoading = false;
      state.succes = true;
    });

    builder.addCase(getAllRecipesByTag.pending, (state, action: AnyAction) => {
      state.isLoading = true;
      state.succes = false;
    });
    builder.addCase(
      LikeRecipeThunk.fulfilled,
      (state, {payload}: PayloadAction<IResponsePostLikeRecipe>) => {
        state.error = null;
        state.succes = true;

        state.isLoading = false;
        state.message = payload.message;
        if (state.data) {
          if (payload.data && state.data)
            state.data = {
              filteredByRecipeCuisine: updateCounter(
                state.data.filteredByRecipeCuisine,
                payload.data,
              ),
              filteredByRecipeDescription: updateCounter(
                state.data.filteredByRecipeDescription,
                payload.data,
              ),
              filteredByRecipeDinnerType: updateCounter(
                state.data.filteredByRecipeDinnerType,
                payload.data,
              ),
              filteredByRecipeName: updateCounter(
                state.data.filteredByRecipeName,
                payload.data,
              ),
              filteredRecipesByOwner: updateCounter(
                state.data.filteredRecipesByOwner,
                payload.data,
              ),
              filteredRecipesByTag: updateCounter(
                state.data.filteredRecipesByTag,
                payload.data,
              ),
            };
        }
      },
    );
  },
});

export const getRecipesErrorbyTag = () =>
  useSelector((state: RootState) => state.recipesByTag.error);
export const {cleanUpRecipesByTag} = RecipesByTag.actions;
export default RecipesByTag.reducer;

const updateCounter = (recipe: IRecipe[], counter: ICounter) => {
  return recipe?.map(recipe =>
    recipe._id === counter.relatedId._id
      ? {
          ...recipe,
          counter: counter,
        }
      : recipe,
  );
};
