import {editShoppingListThunk} from './updateShoppinglist.thunk';
import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IResponseGetShoppingLists} from '../types';

const initialState: IResponseGetShoppingLists = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const editShoppingList = createSlice({
  name: 'editShoppingList',
  initialState,
  reducers: {
    cleanUpShoppingListEdit: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },

  extraReducers: builder => {
    builder.addCase(editShoppingListThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.data = null;
      state.isLoading = false;
    });

    builder.addCase(
      editShoppingListThunk.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );

    builder.addCase(editShoppingListThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ///
  },
});

export const {cleanUpShoppingListEdit} = editShoppingList.actions;
export default editShoppingList.reducer;
