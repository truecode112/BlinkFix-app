import React from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponsePlaceOrder} from '../types';
import {CreateStripeAccount} from './createStripeAccount.thunk';

const initialState: IResponsePlaceOrder<{stripe_id: string} | null> = {
  error: undefined,
  message: null,
  data: null,
  isLoading: false,
  succes: false,
};

const StripeAccountSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpCreateStripeAccount: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(CreateStripeAccount.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      CreateStripeAccount.fulfilled,
      (
        state,
        {payload}: PayloadAction<IResponsePlaceOrder<{stripe_id: string}>>,
      ) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(CreateStripeAccount.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
  },
});

export const {cleanUpCreateStripeAccount} = StripeAccountSlice.actions;
export default StripeAccountSlice.reducer;
