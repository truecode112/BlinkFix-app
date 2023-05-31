import {JobGetByIdThunk} from './JobGetById.thunk';
import {initialState, IJobGetById} from './JobGetById.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const JobGetByIdSlice = createSlice({
  name: 'JobGetByIdSlice',
  initialState,
  reducers: {
    cleanUpJobGetByIdSlice: state => {},
  },
  extraReducers: builder => {
    //#region JobGetById
    builder.addCase(JobGetByIdThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      JobGetByIdThunk.fulfilled,
      (state, {payload}: PayloadAction<IJobGetById>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(JobGetByIdThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    // #endregion
  },
});

export const {cleanUpJobGetByIdSlice} = JobGetByIdSlice.actions;
export default JobGetByIdSlice.reducer;
