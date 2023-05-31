import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import {FilterInterface} from '../Order/Establishments/getNerbayEstablishments.thunk';

const initialState: {
  isViewScrollable: boolean;
  scrollPosition: number;
  lastNavigationDirection: string | undefined;
  orderFilters: FilterInterface | null;
  language: string;
} = {
  isViewScrollable: true,
  scrollPosition: 0,
  lastNavigationDirection: undefined,
  orderFilters: null,
  language: 'en',
};

const AppSetup = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setIsViewScrollable: (state, {payload}: PayloadAction<boolean>) => {
      state.isViewScrollable = payload;
    },
    setScrollPosition: (state, {payload}: PayloadAction<number>) => {
      state.scrollPosition = payload;
    },
    setLastNavigationDirection: (state, {payload}: PayloadAction<string>) => {
      state.lastNavigationDirection = payload;
    },

    setLanguage: (state, {payload}: PayloadAction<string>) => {
      state.language = payload;
    },

    setFiltersState: (
      state,
      {payload}: PayloadAction<FilterInterface | undefined>,
    ) => {
      if (payload === undefined) {
        state.orderFilters = null;
      } else {
        state.orderFilters = payload;
      }
    },
  },
});

export const {
  setIsViewScrollable,
  setScrollPosition,
  setLastNavigationDirection,
  setFiltersState,
  setLanguage,
} = AppSetup.actions;
export default AppSetup.reducer;
