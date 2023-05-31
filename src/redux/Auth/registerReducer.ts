import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {createSlice} from '@reduxjs/toolkit';
import {
  IResponseLoginIResponseLogin,
  IResponseRegisterResponse,
} from './AuthTypes';
import {registerThunk} from './thunks';
import {setIsLoading} from '../rootReducer';

const initialState: IResponseRegisterResponse = {
  error: '',
  message: '',
  data: null,
  isLoading: false,
  succes: false,
};

const register = createSlice({
  name: 'register',
  initialState,
  reducers: {
    cleanUpRegister: state => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.data = initialState.data;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(registerThunk.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
      state.succes = false;
    });
    builder.addCase(registerThunk.fulfilled, (state, {payload}) => {
      state.data = payload.data;
      state.message = payload.message;
      state.isLoading = false;
      state.succes = true;
    });
    builder.addCase(registerThunk.pending, (state, action) => {
      state.isLoading = true;
      state.succes = false;
    });
  },
});

export const {cleanUpRegister} = register.actions;
export const getRegisterStateState = () =>
  useSelector((state: RootState) => state.register.isLoading);

export const getRegisterStatus = () =>
  useSelector((state: RootState) => state.register.succes);

export const getRegisterError = () =>
  useSelector((state: RootState) => {
    return state.register.error;
  });
export default register.reducer;
