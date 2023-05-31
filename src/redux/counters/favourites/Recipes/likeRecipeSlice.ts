import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponseSlice} from '../../../Order/Order/types';
import {ICounter} from '../../../recipes/types';
import {LikeRecipeThunk} from './Favourites.thunk';

const initialState: IResponseSlice<ICounter | null> = {
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
    //  #region
    builder.addCase(LikeRecipeThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      LikeRecipeThunk.fulfilled,
      (state, {payload}: PayloadAction<any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(LikeRecipeThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
  },
});

export const {cleanUpEstablishment} = MyFavouritesRecipesSlice.actions;
export default MyFavouritesRecipesSlice.reducer;
