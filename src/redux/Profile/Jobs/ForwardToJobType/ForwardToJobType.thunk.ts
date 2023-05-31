import {instance} from './../../../interceptors';
import {IForwardToJobType} from './ForwardToJobType.types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../../utils/localStorage';

const requestUri: string = '/profile/job/forwardTo/';
const thunkName: string = 'ForwardToJobTypeThunk';

//TODO: add this to My establishment slice
export const ForwardToJobTypeThunk = createAsyncThunk<
  IForwardToJobType,
  {forwardTo: string; jobId: string; orderId: string}
>(thunkName, async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();

    const res = await instance
      .post(
        `${requestUri}${state.forwardTo}`,
        {jobId: state.jobId, orderId: state.orderId},
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
      error: '',
      data: null,
    });
  }
});
