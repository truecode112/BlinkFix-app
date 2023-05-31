import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseSlice} from '../../Order/Order/types';

export type IAllergiesData = {
  _id: string;
  ownerId: string;
  allergies: number[];
};

export interface IResponseGetAllergies
  extends IResponseSlice<IAllergiesData | null> {}

export const getAllergies = createAsyncThunk<IResponseGetAllergies>(
  'profile/allergy/get}',
  async (_, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .get(`/profile/allergies`, {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
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
  },
);
