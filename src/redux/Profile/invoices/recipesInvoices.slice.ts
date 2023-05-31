import {ActionCreator, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponseSlice} from '../../Order/Order/types';
import {IRecipe} from '../../recipes/types';
import {getInvoicesRecipesThunk} from './recipeInvoices.thunk';

export interface IInvoiceRecipe {
  recipe: IRecipe;
  wagePerK: number;
  wage: number;
  numberOfClicks: number;
  numberOfShares: number;
  numberOflikes: number;
  whoLike: string[];
  whoShare: string[];
}
const initialState: IResponseSlice<IInvoiceRecipe[] | null> = {
  error: undefined,
  message: null,
  data: [],
  isLoading: false,
  succes: false,
};

const RecipeInvoicesSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpJobRequests: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    //#region get profile
    builder.addCase(getInvoicesRecipesThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
      state.data = [];
    });
    builder.addCase(
      getInvoicesRecipesThunk.fulfilled,
      (state, {payload}: PayloadAction<any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(getInvoicesRecipesThunk.pending, (state, {payload}) => {
      state.isLoading = true;
      state.data = [];
      state.succes = false;
    });
    //#endregion
  },
});

export const {cleanUpJobRequests} = RecipeInvoicesSlice.actions;
export default RecipeInvoicesSlice.reducer;
