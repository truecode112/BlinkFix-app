import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IResponseSlice} from '../../Order/Order/types';
import {createNewWallet, getMyWallet} from './wallet.thunks';

export interface ITransaction {
  type: string;
  amount: string;
  description: string;
  _id: string;
  transferAt: string;
}

export interface IWallet {
  _id: string;
  balance: {
    availableBalance: number;
    pendingBalance: number;
  };
  currency: string;
  user: string;
  transactions: ITransaction[];
}

export type IMyWalletSlice = IResponseSlice<IWallet | null>;

export type IMyWalletFound = {
  type: string;
  amount: string;
  description: string;
};

const initialState: IMyWalletSlice = {
  error: undefined,
  message: null,
  data: null,
  isLoading: false,
  succes: false,
};

const MyWalletSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpWalletRequests: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    //#region get profile
    builder.addCase(getMyWallet.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(getMyWallet.fulfilled, (state, {payload}: AnyAction) => {
      state.error = null;
      state.succes = true;
      state.data = payload.data;
      state.isLoading = false;
      state.message = payload.message;
    });
    builder.addCase(getMyWallet.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    // #endregion

    // #region
    builder.addCase(createNewWallet.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;
      state.isLoading = false;
    });
    builder.addCase(
      createNewWallet.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(createNewWallet.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region edit profile
  },
});

export const {cleanUpWalletRequests} = MyWalletSlice.actions;
export default MyWalletSlice.reducer;
