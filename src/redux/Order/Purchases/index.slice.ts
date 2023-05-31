import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../../hooks';
import {IResponseSlice} from '../Order/types';
import {GetMyPurchases, IInvoice} from './getMyPurchases.thunk';

const initialState: IResponseSlice<IInvoice[] | undefined> = {
  error: undefined,
  message: null,
  data: undefined,
  isLoading: false,
  succes: false,
};

const PurchasesSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanFindNerbayEstablishmentSlice: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(GetMyPurchases.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      GetMyPurchases.fulfilled,
      (state, {payload}: PayloadAction<IResponseSlice<IInvoice[]>>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
      },
    );
    builder.addCase(GetMyPurchases.pending, (state, {payload}) => {
      state.isLoading = true;
      state.succes = false;
    });
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.Purchases.error);
export const {cleanFindNerbayEstablishmentSlice} = PurchasesSlice.actions;
export default PurchasesSlice.reducer;
