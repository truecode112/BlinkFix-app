import {IResponseSlice} from './../../Order/Order/types';
import {IEstablishment} from '../../Profile/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAllergies, IResponseGetAllergies} from './getAllergies.thunk';
import {addAllergy} from './addAllergy.thunk';
import {deleteAllergy} from './deleteAllergy.thunk';

const initialState: IResponseGetAllergies = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyAllergiesSlice = createSlice({
  name: 'MyAllergies',
  initialState,
  reducers: {
    cleanUpMyAllergiesSlice: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    //  #region
    builder.addCase(getAllergies.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    builder.addCase(getAllergies.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      getAllergies.fulfilled,
      (state, {payload}: PayloadAction<IResponseGetAllergies>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    // builder.addCase(
    //   addAllergy.fulfilled,
    //   (state, {payload}: PayloadAction<IResponseGetAllergies>) => {
    //     state.error = null;
    //     state.succes = true;
    //     state.data = payload.data;
    //     state.isLoading = false;
    //     state.message = payload.message;
    //   },
    // );
    builder.addCase(
      deleteAllergy.fulfilled,
      (state, {payload}: PayloadAction<IResponseGetAllergies>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
  },
});

export const {cleanUpMyAllergiesSlice} = MyAllergiesSlice.actions;
export default MyAllergiesSlice.reducer;
