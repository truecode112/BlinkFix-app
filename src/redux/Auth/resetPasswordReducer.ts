import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IResponseRegisterResponse, IStripeRegister} from './AuthTypes';
import {registerThunk} from './thunks';
import axios from 'axios';

export interface IResquestResetPassword {
  error?: any;
  message?: string;
  data: {
    resetCode: string;
    createdAt: string;
    userId: string;
    _id: string;
  } | null;
  isLoading?: boolean;
  succes?: boolean;
}

const initialState: IResquestResetPassword = {
  error: '',
  message: '',
  data: null,
  isLoading: false,
  succes: false,
};

const registerStripeSlice = createSlice({
  name: 'registerStripe',
  initialState,
  reducers: {
    cleanUpResetPasswordrequest: state => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.data = initialState.data;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(requestResetPassword.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
      state.succes = false;
    });
    builder.addCase(requestResetPassword.fulfilled, (state, {payload}) => {
      state.data = payload.data;
      state.message = payload.message;
      state.isLoading = false;
      state.succes = true;
    });
    builder.addCase(requestResetPassword.pending, (state, action) => {
      state.isLoading = true;
      state.succes = false;
    });
    //
    builder.addCase(responseResetPassword.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
      state.succes = false;
    });
    builder.addCase(responseResetPassword.fulfilled, (state, {payload}) => {
      state.data = payload.data;
      state.message = payload.message;
      state.isLoading = false;
      state.succes = true;
    });
    builder.addCase(responseResetPassword.pending, (state, action) => {
      state.isLoading = true;
      state.succes = false;
    });
  },
});

export const requestResetPassword = createAsyncThunk<
  IResquestResetPassword,
  string
>('user/resetPassword', async (state, {rejectWithValue}) => {
  try {
    const res = await axios
      .post('/user/resetrequest', {email: state.toLowerCase()})
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
      error: JSON.stringify(error),
      data: null,
    });
  }
});

export const responseResetPassword = createAsyncThunk<
  IResquestResetPassword,
  {resetCode: string; password: string; confirmPassword: string}
>('user/resetPasswordres', async (state, {rejectWithValue}) => {
  try {
    const res = await axios
      .post('/user/resetresponse', state)
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
      error: JSON.stringify(error),
      data: null,
    });
  }
});

export const {cleanUpResetPasswordrequest} = registerStripeSlice.actions;

export default registerStripeSlice.reducer;
