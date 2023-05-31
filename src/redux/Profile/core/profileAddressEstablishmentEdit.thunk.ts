import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IGetAddress, IResponseGetMyProfile} from '../types';

export const editMyEstablishmentAddress = createAsyncThunk<
  IResponseGetMyProfile,
  {
    establishmentId: string;
    address: IGetAddress;
  } //establishmentId
>('/establishment/edit/address}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    if (!state) {
      return rejectWithValue('no data provided');
    }
    const res = await instance
      .put(
        `/order/establishment/edit/address/${state.establishmentId}`,
        state.address,
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
