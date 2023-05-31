import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  CounterLikeEstablishment,
  IResponseCounterLikeEstablishment,
} from '../../counters/favourites/likeEstablishment.thunk';
import {IResponseLikeMenuItem} from '../../counters/favourites/Order/menuItems/addMenuItemLike.slice';
import {AddMenuItemLike} from '../../counters/favourites/Order/menuItems/addMenuItemLike.thunk';
import {useAppSelector} from '../../hooks';
import {
  GetNerbayEstablishment,
  IResponseGetNerbayEstablishment,
} from './getNerbayEstablishments.thunk';

const initialState: IResponseGetNerbayEstablishment = {
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
    cleanFindNerbayEstablishmentSlice: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
    LikeTestDispatch: (
      state,
      {payload}: PayloadAction<{establishmentId: string; itemId: string}>,
    ) => {},
  },
  extraReducers: builder => {
    builder.addCase(
      AddMenuItemLike.fulfilled,
      (state, {payload}: PayloadAction<IResponseLikeMenuItem>) => {
        state.error = null;
        state.succes = true;
        state.isLoading = false;

        const establishmentId = payload.data?.establishmentId;
        const itemId = payload.data?._id;
        if (!establishmentId || establishmentId === undefined) {
          return;
        }
        if (state.data && itemId) {
          const matchingEstab = state.data.map(establishment => {
            if (establishment._id === establishmentId) {
              const menuFiltered = establishment?.menu?.map(menu => {
                const itemIds = menu.menuItems.map(item => item._id);
                const matchingMenu = itemIds.includes(itemId);
                if (!matchingMenu) {
                  return menu;
                } else {
                  const menuItemfiltered = menu?.menuItems.find(
                    item => item._id === itemId,
                  );
                  const newMenuItems = menu.menuItems.map(item => {
                    if (item._id !== menuItemfiltered?._id) return item;
                    else {
                      // const counter = item.counter; TODO: here be response
                      return payload.data ? payload.data : item;
                    }
                  });
                  menu.menuItems = newMenuItems;
                  return menu;
                }
              });
              establishment.menu = menuFiltered;
              return establishment;
            } else {
              return establishment;
            }
          });
          //
          state.data = matchingEstab;
        }
        //
      },
    );
    builder.addCase(GetNerbayEstablishment.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      GetNerbayEstablishment.fulfilled,
      (
        state,
        {payload}: PayloadAction<IResponseGetNerbayEstablishment | any>,
      ) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );

    builder.addCase(
      CounterLikeEstablishment.fulfilled,
      (state, {payload}: PayloadAction<IResponseCounterLikeEstablishment>) => {
        state.error = null;
        state.succes = true;
        const establishmentId = payload.data._id;

        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(GetNerbayEstablishment.pending, (state, {payload}) => {
      state.isLoading = true;
    });
  },
});

export const getMyRecipesError = () =>
  useAppSelector(state => state.findNerbayEstablishment.error);
export const {cleanFindNerbayEstablishmentSlice, LikeTestDispatch} =
  NerbayEstablishmentSlice.actions;
export default NerbayEstablishmentSlice.reducer;
