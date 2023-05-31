import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IResponseGetShoppingLists,
  IResponseGetSingleShoppingList,
} from '../types';
import {addClearShoppingListThunk} from './addShoppinglist.thunk';
const initialState: IResponseGetShoppingLists = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const shoppingList = createSlice({
  name: 'ShoppingLists',
  initialState,
  reducers: {
    cleanUpshoppingListClear: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    //#region edit list
    builder.addCase(addClearShoppingListThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      addClearShoppingListThunk.fulfilled,
      (state, {payload}: PayloadAction<IResponseGetSingleShoppingList>) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload?.message;
        if (payload.data) {
          state.data?.push({
            shoppingList: {
              _id: payload.data.shoppingList._id,
              createdAt: payload.data.shoppingList.createdAt,
              updatedAt: payload.data.shoppingList.updatedAt,
              owner: payload.data.shoppingList.owner,
              ingredients: payload.data.shoppingList.ingredients,
              recipeId: '',
              tipIngredients: [],
            },
            recipe: undefined,
          });
        }
      },
    );
    builder.addCase(addClearShoppingListThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
  },
});

export const getshoppingListError = () =>
  useSelector((state: RootState) => state.shoppingList.error);
export const {cleanUpshoppingListClear} = shoppingList.actions;
export default shoppingList.reducer;
