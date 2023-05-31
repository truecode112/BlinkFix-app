import {IResponseGetMyEstablishment} from './../Establishment.workinghours.thunk';
import {GetEstablishment} from './../order.thunk';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../../hooks';
import {
  EditEstablishmentPosition,
  IResponseEditMyEstablishment,
} from './editEsablishment.thunk';
import {EditEstablishmentTexPercentage} from './taxes/editEsablishmentTaxes.thunk';

const initialState: IResponseEditMyEstablishment = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyEstablishmentSlice = createSlice({
  name: 'myEstablishment',
  initialState,
  reducers: {
    cleanUpEstablishment: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(EditEstablishmentPosition.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      EditEstablishmentPosition.fulfilled,
      (state, {payload}: PayloadAction<IResponseEditMyEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(EditEstablishmentPosition.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //////////////////////////////////////////////////////////////
    builder.addCase(GetEstablishment.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      GetEstablishment.fulfilled,
      (
        state,
        {payload}: PayloadAction<IResponseGetMyEstablishment[] | any>,
      ) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(GetEstablishment.pending, (state, {payload}) => {
      state.isLoading = true;
    });

    builder.addCase(
      EditEstablishmentTexPercentage.fulfilled,
      (state, {payload}: PayloadAction<IResponseEditMyEstablishment>) => {
        state.data = payload.data;
        //
      },
    );
    //////////////////////////////////////////////////////////////
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.MyEstablishment.error);
export const {cleanUpEstablishment} = MyEstablishmentSlice.actions;
export default MyEstablishmentSlice.reducer;
