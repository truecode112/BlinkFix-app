import {category} from './../../../../components/categorySelector/allCategories';
import {instance} from './../../../interceptors';
import {getTokensKeychain} from './../../../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IMenuItem, IResponseGetMyEstablishmentMenus} from '../types';

export const PostMyEstabishmentMenuItem = createAsyncThunk<
  IResponseGetMyEstablishmentMenus,
  {menuID: string; menuItem: IMenuItem}
>(
  'profile/establishmentMenus/menuItem/post}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .post(
          `/order/establishment/menu/addItem/${state.menuID}`,
          {
            dishName: state.menuItem.dishName,
            dishDescription: state.menuItem.dishDescription,
            price: state.menuItem.price,
            currency: state.menuItem.currency,
            isDishForDelivery: state.menuItem.isDishForDelivery,
            category: state.menuItem.category,
            spiceness: state.menuItem.spiceness,
            isVegan: state.menuItem.isVegan,
            isHalal: state.menuItem.isHalal,
            isKosher: state.menuItem.isKosher,
            dishIngredients: state.menuItem.dishIngredients,
          },
          {
            headers: {
              Authorization: 'Bearer ' + tokens?.access_token,
            },
          },
        )
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.log(error.response.data);
          return rejectWithValue(error.response.data.message);
        });

      return res;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
export const EditMyEstabishmentMenuItem = createAsyncThunk<
  IResponseGetMyEstablishmentMenus,
  {menuID: string; menuItem: IMenuItem}
>(
  'profile/establishmentMenus/menuItem/put}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .put(
          `/order/establishment/menu/updateItem/${state.menuID}/${state.menuItem._id}`,
          {
            dishName: state.menuItem.dishName,
            dishDescription: state.menuItem.dishDescription,
            price: state.menuItem.price,
            currency: state.menuItem.currency,
            isDishForDelivery: state.menuItem.isDishForDelivery,
            category: state.menuItem.category,
            spiceness: state.menuItem.spiceness,
            isVegan: state.menuItem.isVegan,
            isHalal: state.menuItem.isHalal,
            isKosher: state.menuItem.isKosher,
            dishIngredients: state.menuItem.dishIngredients,
          },
          {
            headers: {
              Authorization: 'Bearer ' + tokens?.access_token,
            },
          },
        )
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.log(error.response.data);
          return rejectWithValue(error.response.data.message);
        });

      return res;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
export const DeleteMyEstabishmentMenuItem = createAsyncThunk<
  IResponseGetMyEstablishmentMenus,
  {menuID: string; menuItem: IMenuItem}
>(
  'profile/establishmentMenus/menuItem/delete}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .delete(
          `/order/establishment/menu/deleteItem/${state.menuID}/${state.menuItem._id}`,
          {
            headers: {
              Authorization: 'Bearer ' + tokens?.access_token,
            },
          },
        )
        .then(response => {
          return response.data;
        })
        .catch(error => {
          console.log(error.response.data);
          return rejectWithValue(error.response.data.message);
        });

      return res;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
