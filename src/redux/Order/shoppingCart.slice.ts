import {useAppSelector} from '../hooks';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IEstablishment, IGetAddress, IMenuItem} from '../Profile/types';
import {uniqueId} from 'lodash';

export interface ICartItemChange {
  ingredientId: string;
  qtt: string;
  _id?: string;
}

export interface ICartItemItem {
  itemId: string;
  changes: ICartItemChange[];
  item: IMenuItem;
  index: string;
}

export interface IShoppingCart {
  orderWhere: string;
  orderItems: ICartItemItem[];
  establishment: IEstablishment;
}

const initialShoppingCart: {cartItems: IShoppingCart[] | null} = {
  cartItems: null,
};

export const ShoppingCartSlice = createSlice({
  name: 'ShoppingCart',
  initialState: initialShoppingCart,
  reducers: {
    addNewItemToCart: (
      state,
      {
        payload,
      }: PayloadAction<{
        orderWhere: string;
        orderItems: ICartItemItem;
        establishment: IEstablishment;
      }>,
    ) => {
      if (!state.cartItems) {
        state.cartItems = [];
      }

      const isEmpty =
        state.cartItems &&
        state.cartItems.filter(item => item.orderWhere === payload.orderWhere)
          .length !== 0
          ? false
          : true;

      if (isEmpty) {
        state.cartItems.push({
          orderItems: [payload.orderItems],
          orderWhere: payload.orderWhere,
          establishment: payload.establishment,
        });
      } else {
        const newItems = state.cartItems?.map(cartItem => {
          if (cartItem.orderWhere === payload.orderWhere) {
            cartItem.orderItems.push(payload.orderItems);
            return cartItem;
          } else {
            return cartItem;
          }
        });
        if (newItems) state.cartItems = newItems;
      }
    },
    clearShoppingList: state => {
      state.cartItems = null;
    },
    deleteShoppingListsByIndex: (state, {payload}: PayloadAction<string[]>) => {
      const toDelete = state.cartItems?.filter(item => {
        const items = item.orderItems.filter(
          orderItem => !payload?.includes(orderItem.index),
        );
        item.orderItems = items;
        if (item.orderItems.length !== 0) return item;
      });
      if (toDelete && state.cartItems) {
        state.cartItems = toDelete;
      }
    },
  },
  extraReducers: builder => {
    // builder.addCase(GetEstablishment.rejected, (state, {payload}) => {
    //   state.error = payload;
    //   state.succes = false;
    //   state.isLoading = false;
    // });
    // builder.addCase(
    //   GetEstablishment.fulfilled,
    //   (state, {payload}: PayloadAction<IEstablishment | any>) => {
    //     state.error = null;
    //     state.succes = true;
    //     state.data = payload.data;
    //     state.isLoading = false;
    //     state.message = payload.message;
    //   },
    // );
    // builder.addCase(GetEstablishment.pending, (state, {payload}) => {
    //   state.isLoading = true;
    // });
    ////////////////////////////////////////////////////////////////
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.establishment.error);
export const {addNewItemToCart, clearShoppingList, deleteShoppingListsByIndex} =
  ShoppingCartSlice.actions;
