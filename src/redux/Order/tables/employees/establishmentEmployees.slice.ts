import {IEstablishment} from '../../../Profile/types';
import {useAppSelector} from '../../../hooks';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GetEstablishment, IResponseGetMyEstablishment} from '../../order.thunk';
import {editMyEstablishmentAddress} from '../../../Profile/core/profileAddressEstablishmentEdit.thunk';
import {AddTableToEstablishment} from '../tableAdd.thunk';
import {DeleteTableEstablishment} from '../tableDelete.thunk';
import {
  EmpoyeesToAccept,
  IResponseGetEmployeesToAccept,
} from './getEmployeesToAccept.thunk';
import {EmpoyeesReject} from './RejectNewEmployee.thunk';
import {EmpoyeesAccept} from './ConfirmNewEmployee.thunk';

const initialState: IResponseGetEmployeesToAccept = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyEstablishmentSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    cleanUpGetMyProfile: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(EmpoyeesToAccept.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      EmpoyeesToAccept.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(EmpoyeesToAccept.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
    builder.addCase(EmpoyeesReject.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      EmpoyeesReject.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(EmpoyeesReject.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
    builder.addCase(EmpoyeesAccept.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      EmpoyeesAccept.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(EmpoyeesAccept.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.establishment.error);
export const {cleanUpGetMyProfile} = MyEstablishmentSlice.actions;
export default MyEstablishmentSlice.reducer;
