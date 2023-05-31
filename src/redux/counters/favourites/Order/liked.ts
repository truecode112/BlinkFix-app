import {IResponseSlice} from '../../../Order/Order/types';
import {IEstablishment} from '../../../Profile/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponsePostGetLikedOrder, LikedEstablishmentThunk} from '.';
import {CounterLikeEstablishment} from '../likeEstablishment.thunk';

const initialState: IResponseSlice<IEstablishment[] | null> = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyFavouritesEstablishmentSlice = createSlice({
  name: 'LikedRecipes',
  initialState,
  reducers: {
    cleanUpEstablishmentLike: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    //  #region
    builder.addCase(LikedEstablishmentThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      LikedEstablishmentThunk.fulfilled,
      (state, {payload}: PayloadAction<IResponsePostGetLikedOrder>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(LikedEstablishmentThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    builder.addCase(CounterLikeEstablishment.fulfilled, (state, {payload}) => {
      state.error = null;
      state.succes = true;
      state.isLoading = false;
      state.message = payload.message;
      if (payload.data && payload.data !== null) {
        const newData = state.data?.map(establshment =>
          establshment._id === payload.data?._id ? payload.data : establshment,
        );
        if (newData) state.data = newData;
      } else if (payload.data) {
        state.data = [payload.data];
      }
    });
    //#endregion
  },
});

export const {cleanUpEstablishmentLike} =
  MyFavouritesEstablishmentSlice.actions;
export default MyFavouritesEstablishmentSlice.reducer;
