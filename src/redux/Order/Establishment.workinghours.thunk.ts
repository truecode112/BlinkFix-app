import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../utils/localStorage';
import {instance} from '../interceptors';
import {
  IEstablishment,
  IGetProfileInfo,
  IResponseGetMyProfile,
  IWokringHours,
} from '../Profile/types';

export const EditEstablishmentWorkingHours = createAsyncThunk<
  IResponseGetMyEstablishment,
  {hours: IWokringHours[]; establishmentId: string | undefined}
>('Establishment/openHours/edit}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .put(
        `/profile/establishment/workingHours/${state.establishmentId}`,
        {openHours: state.hours},
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

export interface IResponseGetMyEstablishment {
  error: any | undefined;
  message: string | undefined;
  data?: IEstablishment[] | null;
  isLoading: boolean;
  succes: boolean;
}
