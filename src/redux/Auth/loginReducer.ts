import {logout} from './../../utils/localStorage/index';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IResponseLoginIResponseLogin} from './AuthTypes';
import {loginThunk, tokenThunk} from './thunks';
import {setIsLoading} from '../rootReducer';

const initialState: IResponseLoginIResponseLogin = {
  error: '',
  message: '',
  data: {},
  isLoading: false,
  succes: false,
};

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    cleanUpLogin: state => {
      state.data = {
        access_token: undefined,
        refresh_token: undefined,
      };
      state.message = '';
      state.isLoading = false;
      state.succes = false;
      state.error = null;
    },
    setAuthState: (state, {payload}: PayloadAction<any>) => {
      state.data = payload;
    },
    setAuthStatus: (state, {payload}: PayloadAction<boolean>) => {
      state.succes = payload;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(loginThunk.rejected, (state, {payload}: AnyAction) => {
      state.isLoading = false;
      state.error = payload;
      state.succes = false;
    });
    builder.addCase(loginThunk.fulfilled, (state, action: AnyAction) => {
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.isLoading = false;
      state.succes = true;
    });
    builder.addCase(loginThunk.pending, (state, action: AnyAction) => {
      state.isLoading = true;
      state.succes = false;
    });

    builder.addCase(tokenThunk.fulfilled, (state, {payload}: AnyAction) => {
      state.data = payload;
      state.isLoading = false;
    });

    builder.addCase(tokenThunk.pending, (state, {payload}: AnyAction) => {
      state.isLoading = true;
    });
    builder.addCase(tokenThunk.rejected, (state, {payload}: AnyAction) => {
      state.isLoading = false;
      state.error = payload.error;
    });
  },
});

export const getAuthStateState = () =>
  useSelector((state: RootState) => state.login.isLoading);

export const getTokens = () =>
  useSelector((state: RootState) => state.login.data);

export const getStatus = () =>
  useSelector((state: RootState) => state.login.succes);

export const getLoginErrors = () =>
  useSelector((state: RootState) => state.login.error?.message);
export const {cleanUpLogin, setAuthState, setAuthStatus} = login.actions;
export default login.reducer;
