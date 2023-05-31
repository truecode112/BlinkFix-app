import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IResponseSlice} from '../../Order/Order/types';
import {IGetProfileInfo} from '../types';

export interface IResponseGetMyProfile
  extends IResponseSlice<{
    _id: string;
    ownerId: string;
    allergies: number[];
    __v: 0;
  }> {}

export const addAllergy = createAsyncThunk<IResponseGetMyProfile, number>(
  'profile/allergy/post}',
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();
      if (!state) {
        return rejectWithValue('no data provided');
      } else {
        const res = await instance
          .post(
            `profile/allergies`,
            {
              allergy: state,
            },
            {
              headers: {Authorization: 'Bearer ' + tokens?.access_token},
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
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
