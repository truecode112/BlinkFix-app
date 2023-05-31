import {IForwardedToJobType} from './ForwardedToJobType.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../../utils/localStorage';
import {instance} from '../../../interceptors';

const requestUri: string = '/profile/job/forwardedTo';
const thunkName: string = 'ForwardedToJobTypeThunk';

//TODO: add this to My establishment slice
export const ForwardedToJobTypeThunk = createAsyncThunk<
  IForwardedToJobType,
  {jobId: string; jobType: string}
>(thunkName, async ({jobId, jobType}, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .get(`${requestUri}/${jobType}/${jobId}`, {
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
});
