import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../../../hooks';
import {CreateEstablishmentThunk} from './createEstablishment.thunk';
import {ResponseFromCreateEstablishment} from './types';

const initialState: ResponseFromCreateEstablishment = {
  error: undefined,
  message: null,
  isLoading: false,
  data: null,
  succes: false,
};

const CreateEstablishmentSclice = createSlice({
  name: 'CreateEstablishment',
  initialState,
  reducers: {
    cleanCreateEstablishmentSclice: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(CreateEstablishmentThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      CreateEstablishmentThunk.fulfilled,
      (
        state,
        {payload}: PayloadAction<ResponseFromCreateEstablishment | any>,
      ) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(CreateEstablishmentThunk.pending, (state, {payload}) => {
      state.isLoading = true;
    });
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.findNerbayEstablishment.error);
export const {cleanCreateEstablishmentSclice} =
  CreateEstablishmentSclice.actions;
export default CreateEstablishmentSclice.reducer;
