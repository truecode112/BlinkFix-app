import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../../hooks';
import {IResponsePlaceOrder, ResponseOrder} from './types';
import {AddNewOrder} from './UserPlaceOrder.thunk';

const initialState: IResponsePlaceOrder<ResponseOrder | null> = {
  error: undefined,
  message: null,
  data: null,
  isLoading: false,
  succes: false,
};

const OrderSlice = createSlice({
  name: 'OrderSlice',
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
    builder.addCase(AddNewOrder.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      AddNewOrder.fulfilled,
      (state, {payload}: PayloadAction<IResponsePlaceOrder<ResponseOrder>>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(AddNewOrder.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.establishment.error);
export const {cleanUpEstablishment} = OrderSlice.actions;
export default OrderSlice.reducer;
