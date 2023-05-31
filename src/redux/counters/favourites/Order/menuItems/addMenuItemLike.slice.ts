import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {IResponseSlice} from '../../../../Order/Order/types';
import {IMenuItem} from '../../../../Profile/types';
import {AddMenuItemLike} from './addMenuItemLike.thunk';

export interface IResponseLikeMenuItem
  extends IResponseSlice<IMenuItem | null> {}

const initialState: IResponseLikeMenuItem = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyFavouritesMenuItemSlice = createSlice({
  name: 'LikedMenuItems',
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
    ////////////////////////////////////////////////////////////////
    builder.addCase(
      AddMenuItemLike.fulfilled,
      (state, {payload}: PayloadAction<IResponseLikeMenuItem>) => {
        state.error = null;
        state.succes = true;

        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(AddMenuItemLike.pending, (state, {payload}) => {
      state.error = null;
      state.succes = true;
      // state.data = payload.data;
      state.isLoading = false;
    });
    builder.addCase(AddMenuItemLike.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      // state.data = payload.data;
      state.isLoading = false;
    });
  },
});

export const {cleanUpEstablishment} = MyFavouritesMenuItemSlice.actions;
export default MyFavouritesMenuItemSlice.reducer;
