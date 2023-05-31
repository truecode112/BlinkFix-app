import {ActionCreator, createSlice, AnyAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../../hooks';
import {
  deleteMyEstabishmentMenus,
  getMyEstabishmentMenus,
  PostMyEstabishmentMenus,
  PostMyEstabishmentMenusItemImages,
} from './EstablishmentMenu.thunk';
import {
  PostMyEstabishmentMenuItem,
  EditMyEstabishmentMenuItem,
  DeleteMyEstabishmentMenuItem,
} from './establishmentMenuItem/addEstablishmentMenuItem';
import {IResponseGetMyEstablishmentMenus} from './types';

const initialState: IResponseGetMyEstablishmentMenus = {
  error: undefined,
  message: undefined,
  data: null,
  isLoading: false,
  succes: false,
};

const MyEstabishmentMenus = createSlice({
  name: 'MyEstablishmentMenuSlice',
  initialState,
  reducers: {
    cleanUpMyEstablishmentMenusGet: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    //#region get profile
    builder.addCase(getMyEstabishmentMenus.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      getMyEstabishmentMenus.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(getMyEstabishmentMenus.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region get profile
    builder.addCase(PostMyEstabishmentMenus.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      PostMyEstabishmentMenus.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(PostMyEstabishmentMenus.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region get profile
    builder.addCase(deleteMyEstabishmentMenus.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      deleteMyEstabishmentMenus.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(deleteMyEstabishmentMenus.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region get profile
    builder.addCase(PostMyEstabishmentMenuItem.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      PostMyEstabishmentMenuItem.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data.allItems;
        state.isLoading = false;
        state.message = payload.message;
        state.lastAddedId = payload.data.newItemId;
      },
    );
    builder.addCase(PostMyEstabishmentMenuItem.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region get profile
    builder.addCase(EditMyEstabishmentMenuItem.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      EditMyEstabishmentMenuItem.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(EditMyEstabishmentMenuItem.pending, (state, {payload}) => {
      state.isLoading = true;
    });
    //#endregion
    //#region get profile
    builder.addCase(
      DeleteMyEstabishmentMenuItem.rejected,
      (state, {payload}) => {
        state.error = payload;
        state.succes = false;

        state.isLoading = false;
      },
    );
    builder.addCase(
      DeleteMyEstabishmentMenuItem.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(
      DeleteMyEstabishmentMenuItem.pending,
      (state, {payload}) => {
        state.isLoading = true;
      },
    );
    //#endregion
    //#region get profile
    builder.addCase(
      PostMyEstabishmentMenusItemImages.rejected,
      (state, {payload}) => {
        state.error = payload;
        state.succes = false;

        state.isLoading = false;
      },
    );
    builder.addCase(
      PostMyEstabishmentMenusItemImages.fulfilled,
      (state, {payload}: AnyAction) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;
        state.message = payload.message;
        state.lastAddedId = null;
      },
    );
    builder.addCase(
      PostMyEstabishmentMenusItemImages.pending,
      (state, {payload}) => {
        state.isLoading = true;
      },
    );
    //#endregion
  },
});

export const getMyMenuError = () =>
  useAppSelector(state => state.MyEstabishmentMenus.error);
export const {cleanUpMyEstablishmentMenusGet} = MyEstabishmentMenus.actions;
export default MyEstabishmentMenus.reducer;
