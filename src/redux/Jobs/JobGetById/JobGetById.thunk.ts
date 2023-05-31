import {IJobGetById} from './JobGetById.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';

const requestUri: string = '/profile/job/getById/';
const thunkName: string = 'GetJobById';

//TODO: add this to My establishment slice
/**
 * @param string job id as parametr
 */
export const JobGetByIdThunk = createAsyncThunk<IJobGetById, string>(
  thunkName,
  async (state, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .get(requestUri + `${state}`, {
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
        error: '',
        data: null,
      });
    }
  },
);
