import {EstablishmentOrderThunk} from './EstablishmentOrder.thunk';
import {initialState, IEstablishmentOrder} from './EstablishmentOrder.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddNewOrder} from '../Order/UserPlaceOrder.thunk';
import {IResponsePlaceOrder, ResponseOrder} from '../Order/types';

const EstablishmentOrderSlice = createSlice({
  name: 'EstablishmentOrderSlice',
  initialState,
  reducers: {
    cleanUpEstablishmentOrderSlice: state => {
      state = initialState;
      state.message = '';
      console.log(state.message);
    },
  },
  extraReducers: builder => {
    //#region EstablishmentOrder
    builder.addCase(EstablishmentOrderThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      EstablishmentOrderThunk.fulfilled,
      (state, {payload}: PayloadAction<IEstablishmentOrder>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(
      AddNewOrder.fulfilled,
      (state, {payload}: PayloadAction<IResponsePlaceOrder<ResponseOrder>>) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(EstablishmentOrderThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    // #endregion
  },
});

export const {cleanUpEstablishmentOrderSlice} = EstablishmentOrderSlice.actions;
export default EstablishmentOrderSlice.reducer;
