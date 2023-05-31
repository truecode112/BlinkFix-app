import {instance} from './../../interceptors';
import {IResponseGetMyEstablishmentMenus} from './types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ImagePickerResponse, Asset} from 'react-native-image-picker';
import {getTokensKeychain} from '../../../utils/localStorage';

//#region menu

export const getMyEstabishmentMenus = createAsyncThunk<
  IResponseGetMyEstablishmentMenus,
  string
>('profile/establishmentMenus/get}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance

      .get(`/order/establishment/menu/get/${state}`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
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
});
export const deleteMyEstabishmentMenus = createAsyncThunk<
  IResponseGetMyEstablishmentMenus,
  string
>('profile/establishmentMenus/delete}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance

      .delete(`/order/establishment/menu/delete/${state}`, {
        headers: {
          Authorization: 'Bearer ' + tokens?.access_token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
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
});

export const PostMyEstabishmentMenus = createAsyncThunk<
  IResponseGetMyEstablishmentMenus,
  {establishmentId: string; title: string}
>('profile/establishmentMenus/post}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .post(
        `/order/establishment/menu/add/${state.establishmentId}`,
        {menuName: state.title},
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
});

export const PostMyEstabishmentMenusItemImages = createAsyncThunk<
  IResponseGetMyEstablishmentMenus,
  {menuItemId: string; image: FormData}
>(
  'profile/establishmentMenusItemImage/post}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .post(
          `/order/establishment/menu/addPhotoToItem/${state.menuItemId}`,
          state.image,
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
//#endregion
