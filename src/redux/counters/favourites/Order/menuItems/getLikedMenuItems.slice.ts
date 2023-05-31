import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponseSlice} from '../../../../Order/Order/types';
import {IMenuItem} from '../../../../Profile/types';
import {getLikedMenuItems} from './getLikedMenuItems.thunk';

export interface IResponseGetLikedMenuItems
  extends IResponseSlice<IMenuItem[] | null> {}

const initialState: IResponseGetLikedMenuItems = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyFavouritesMenuItemSlice = createSlice({
  name: 'GetLikedMenuItems',
  initialState,
  reducers: {
    cleanUpGetLikedMenuItems: state => {
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
      getLikedMenuItems.fulfilled,
      (state, {payload}: PayloadAction<IResponseGetLikedMenuItems>) => {
        state.error = null;
        state.succes = true;

        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(getLikedMenuItems.pending, (state, {payload}) => {
      state.error = null;
      state.succes = true;
      // state.data = payload.data;
      state.isLoading = false;
    });
    builder.addCase(getLikedMenuItems.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      // state.data = payload.data;
      state.isLoading = false;
    });
  },
});

export const {cleanUpGetLikedMenuItems} = MyFavouritesMenuItemSlice.actions;
export default MyFavouritesMenuItemSlice.reducer;
