import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getStripeAccountLink, IGetStripeLink} from './AuthStripeLink.thunk';

const initialState: IGetStripeLink = {
  data: null,
  error: null,
  isLoading: false,
  message: null,
  succes: false,
};

const registerStripeLink = createSlice({
  name: 'getStripeLink',
  initialState,
  reducers: {
    cleanUpStripeLink: state => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.data = initialState.data;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
    },
  },
  extraReducers: builder => {
    ///
    builder.addCase(getStripeAccountLink.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
      state.succes = false;
    });
    builder.addCase(
      getStripeAccountLink.fulfilled,
      (state, {payload}: PayloadAction<IGetStripeLink>) => {
        state.data = payload.data;
        state.message = payload.message;
        state.isLoading = false;
        state.succes = true;
      },
    );
    builder.addCase(getStripeAccountLink.pending, (state, action) => {
      state.isLoading = true;
      state.succes = false;
    });
  },
});
export const {cleanUpStripeLink} = registerStripeLink.actions;

export default registerStripeLink.reducer;
