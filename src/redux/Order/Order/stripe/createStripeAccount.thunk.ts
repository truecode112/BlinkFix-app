import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../../utils/localStorage';
import {instance} from '../../../interceptors';
import {IResponsePlaceOrder} from '../types';

export interface IRequestStripeCreate {
  //
  countryCode: string;
  account_number: string;
  currency: string;
  ssn_last_4?: string;
  routing_number?: string;
}

export const CreateStripeAccount = createAsyncThunk<
  IResponsePlaceOrder<{stripe_id: string}>,
  IRequestStripeCreate
>('Stripe/createAccount}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    const res = await instance
      .post(`/order/payment/addstripe`, state, {
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
});
