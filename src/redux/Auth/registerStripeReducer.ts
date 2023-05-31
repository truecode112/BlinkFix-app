import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IResponseRegisterResponse, IStripeRegister} from './AuthTypes';
import {registerThunk} from './thunks';
import axios from 'axios';

const initialState: IResponseRegisterResponse = {
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
    cleanUpRegisterStripe: state => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.data = initialState.data;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(registerStripeThunk.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
      state.succes = false;
    });
    builder.addCase(registerStripeThunk.fulfilled, (state, {payload}) => {
      state.data = payload.data;
      state.message = payload.message;
      state.isLoading = false;
      state.succes = true;
    });
    builder.addCase(registerStripeThunk.pending, (state, action) => {
      state.isLoading = true;
      state.succes = false;
    });
  },
});

export const registerStripeThunk = createAsyncThunk<
  IResponseRegisterResponse,
  IStripeRegister
>('user/stripe', async (state, {rejectWithValue}) => {
  try {
    const res = await axios
      .post('/order/payment/addstripe', state)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error.response.data);

        return rejectWithValue(error.response.data.message);
      });

    return res;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue({
      message: error.message,
      error: 'login failed',
      data: null,
    });
  }
});

export const {cleanUpRegisterStripe} = registerStripeSlice.actions;
export const getRegisterStateState = () =>
  useSelector((state: RootState) => state.register.isLoading);

export const getRegisterStatus = () =>
  useSelector((state: RootState) => state.register.succes);

export const getRegisterError = () =>
  useSelector((state: RootState) => {
    return state.register.error;
  });
export default registerStripeSlice.reducer;
