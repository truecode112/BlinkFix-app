import {IForwardToJobType} from './../ForwardToJobType/ForwardToJobType.types';
import {ForwardToJobTypeThunk} from './../ForwardToJobType/ForwardToJobType.thunk';
import {ForwardedToJobTypeThunk} from './ForwardedToJobType.thunk';
import {initialState, IForwardedToJobType} from './ForwardedToJobType.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const ForwardedToJobTypeSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpForwardedToJobTypeSlice: state => {},
  },
  extraReducers: builder => {
    //#region ForwardedToJobType
    builder.addCase(ForwardedToJobTypeThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      ForwardedToJobTypeThunk.fulfilled,
      (state, {payload}: PayloadAction<IForwardedToJobType>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(ForwardedToJobTypeThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    builder.addCase(
      ForwardToJobTypeThunk.fulfilled,
      (state, {payload}: PayloadAction<IForwardToJobType>) => {
        if (state.data) {
          const filtered = state.data.filter(
            order => order._id !== payload.data?._id,
          );
          state.data = filtered;
        }
        console.log(state.data?.length);
        // state.data = filteredData;
      },
    );

    // #endregion
  },
});

export const {cleanUpForwardedToJobTypeSlice} = ForwardedToJobTypeSlice.actions;
export default ForwardedToJobTypeSlice.reducer;
