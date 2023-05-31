import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EstablishmentOrderThunk} from '../../Order/EstablishmentOrder/EstablishmentOrder.thunk';
import {IEstablishmentOrder} from '../../Order/EstablishmentOrder/EstablishmentOrder.types';
import {IResponsePlaceOrder, ResponseOrder} from '../../Order/Order/types';
import {AddNewOrder} from '../../Order/Order/UserPlaceOrder.thunk';
import {ICartItemItem} from '../../Order/shoppingCart.slice';
import {IEstablishment} from '../../Profile/types';
import {initialState} from './WaiterOrder.types';

const WaiterOrderSlice = createSlice({
  name: 'WaiterOrder',
  initialState,
  reducers: {
    cleanUpWaiterOrderSlice: state => {
      state = initialState;
      state.message = '';
    },
    clearMessage: state => {
      state.message = '';
      state.succes = false;
    },
    addWaiterOrderToCart: (
      state,
      {
        payload,
      }: PayloadAction<{
        orderWhere: string;
        orderItems: ICartItemItem;
        establishment: IEstablishment;
      }>,
    ) => {
      if (state.data) state.data.push(payload);
      else state.data = [payload];
    },

    clearShopingCartWaiter: state => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(
      AddNewOrder.fulfilled,
      (state, {payload}: PayloadAction<IResponsePlaceOrder<ResponseOrder>>) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
  },
});

export const {
  cleanUpWaiterOrderSlice,
  addWaiterOrderToCart,
  clearShopingCartWaiter,
  clearMessage,
} = WaiterOrderSlice.actions;
export default WaiterOrderSlice.reducer;
