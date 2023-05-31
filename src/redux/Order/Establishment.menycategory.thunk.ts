import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../utils/localStorage';
import {instance} from '../interceptors';
import {IIsCategoryVisible} from '../Profile/establishmentMenus/types';
import {IEstablishment, IWokringHours} from '../Profile/types';

export const EditEstablishmentMenuCategories = createAsyncThunk<
  IResponseEditMyEstablishmentMenuCategories,
  {
    categoryVisibility: IIsCategoryVisible[];
    isOurMenuSubmenuVisible: boolean;
    menuId: string | undefined;
  }
>('Establishment/openHours/edit}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .put(
        `/order/establishment/menu/edit/categories/${state.menuId}`,
        {
          categoryVisibility: state.categoryVisibility,
          isOurMenuSubmenuVisible: state.isOurMenuSubmenuVisible,
        },
        {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
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

export interface IResponseEditMyEstablishmentMenuCategories {
  error: any | undefined;
  message: string | undefined;
  data?: IEstablishment | null;
  isLoading: boolean;
  succes: boolean;
}
