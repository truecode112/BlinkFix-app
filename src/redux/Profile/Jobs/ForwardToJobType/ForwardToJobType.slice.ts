import {ForwardToJobTypeThunk} from './ForwardToJobType.thunk';
import {initialState, IForwardToJobType} from './ForwardToJobType.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const ForwardToJobTypeSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpForwardToJobTypeSlice: state => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    //#region ForwardToJobType
    builder.addCase(ForwardToJobTypeThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      ForwardToJobTypeThunk.fulfilled,
      (state, {payload}: PayloadAction<IForwardToJobType>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(ForwardToJobTypeThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    // #endregion
  },
});

export const {cleanUpForwardToJobTypeSlice} = ForwardToJobTypeSlice.actions;
export default ForwardToJobTypeSlice.reducer;
