import {EditEstablishmentMenuCategories} from './Establishment.menycategory.thunk';
import {IEstablishment} from './../Profile/types';
import {useAppSelector} from './../hooks';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GetEstablishment, IResponseGetMyEstablishment} from './order.thunk';
import {editMyEstablishmentAddress} from '../Profile/core/profileAddressEstablishmentEdit.thunk';
import {AddTableToEstablishment} from './tables/tableAdd.thunk';
import {DeleteTableEstablishment} from './tables/tableDelete.thunk';
import {CreateEstablishmentThunk} from './Establishments/create/createEstablishment.thunk';
import {ResponseFromCreateEstablishment} from './Establishments/create/types';
import {EditEstablishmentTexPercentage} from './MyEstablishment/taxes/editEsablishmentTaxes.thunk';
import {IResponseEditMyEstablishment} from './MyEstablishment/editEsablishment.thunk';

const initialState: IResponseGetMyEstablishment = {
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
    cleanUpEstablishment: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      CreateEstablishmentThunk.fulfilled,
      (
        state,
        {payload}: PayloadAction<ResponseFromCreateEstablishment | any>,
      ) => {
        state.error = null;
        state.succes = true;
        state.data = [payload.data];
        // TODO:add establishment after create
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(GetEstablishment.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      GetEstablishment.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
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
    ////////////////////////////////////////////////////////////////
    builder.addCase(editMyEstablishmentAddress.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      editMyEstablishmentAddress.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(editMyEstablishmentAddress.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
    builder.addCase(AddTableToEstablishment.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      AddTableToEstablishment.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        if (state.data) state.data[0].tables = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(AddTableToEstablishment.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
    builder.addCase(DeleteTableEstablishment.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      DeleteTableEstablishment.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        state.error = null;
        state.succes = true;
        if (state.data) state.data[0].tables = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(DeleteTableEstablishment.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    ////////////////////////////////////////////////////////////////
    builder.addCase(
      EditEstablishmentMenuCategories.rejected,
      (state, {payload}) => {
        state.error = payload;
        state.succes = false;

        state.isLoading = false;
      },
    );
    builder.addCase(
      EditEstablishmentMenuCategories.fulfilled,
      (state, {payload}: PayloadAction<IEstablishment | any>) => {
        const returnDataId = payload.data._id;
        const dataFiltered = state.data?.filter(menu => {
          if (menu._id === returnDataId) return payload.data;
          else return menu;
        });

        state.error = null;
        state.succes = true;
        if (state.data) state.data = dataFiltered;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(
      EditEstablishmentMenuCategories.pending,
      (state, {payload}) => {
        state.isLoading = true;
      },
    );
    builder.addCase(
      EditEstablishmentTexPercentage.fulfilled,
      (state, {payload}: PayloadAction<IResponseEditMyEstablishment>) => {
        const newMap = state.data?.map(est =>
          est._id === payload.data?._id ? payload.data : est,
        );
        state.data = newMap;
        //
      },
    );
    ////////////////////////////////////////////////////////////////
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.establishment.error);
export const {cleanUpEstablishment} = MyEstablishmentSlice.actions;
export default MyEstablishmentSlice.reducer;
