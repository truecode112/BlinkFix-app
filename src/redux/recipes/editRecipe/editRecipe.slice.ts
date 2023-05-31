import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IResponseAddRecipe} from '../types';
import {editRecipeThunk} from './editRecipe.thunk';

const initialState: IResponseAddRecipe = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const AddRecipe = createSlice({
  name: 'addRecipe',
  initialState,
  reducers: {
    cleanUpRecipeEdit: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
    cleanupErrorRecipeAdd: state => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.data = initialState.data;
    },
  },
  extraReducers: builder => {
    builder.addCase(editRecipeThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.data = null;
      state.isLoading = false;
    });
    builder.addCase(editRecipeThunk.fulfilled, (state, {payload}) => {
      state.error = null;
      state.succes = true;
      state.data = payload.data;
      state.isLoading = false;
      state.message = payload.message;
      state.lastRecipeAdded = payload.lastRecipeAdded;
    });
    builder.addCase(editRecipeThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ///
  },
});

export const getAddRecipeError = () =>
  useSelector((state: RootState) => state.addRecipe.error);
export const {cleanUpRecipeEdit} = AddRecipe.actions;
export default AddRecipe.reducer;
