import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../../hooks';
import {
  getLocationByAddress,
  IResponseLocationByAddress,
} from './getLocationByAddress.slice';

const initialState: IResponseLocationByAddress = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const NerbayEstablishmentSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanGetLocationSlice: state => {
      state.data = null;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(getLocationByAddress.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      getLocationByAddress.fulfilled,
      (state, {payload}: PayloadAction<IResponseLocationByAddress | any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(getLocationByAddress.pending, (state, {payload}) => {
      state.isLoading = true;
    });
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.findNerbayEstablishment.error);
export const {cleanGetLocationSlice} = NerbayEstablishmentSlice.actions;
export default NerbayEstablishmentSlice.reducer;
