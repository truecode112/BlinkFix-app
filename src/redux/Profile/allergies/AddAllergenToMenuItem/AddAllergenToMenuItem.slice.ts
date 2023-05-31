import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addAllergyToMenuItemThunk} from './AddAllergenToMenuItem.thunk';
import {
  IAddAllergenToMenuItemRTK,
  initialState,
} from './AddAllergenToMenuItem.type';
import {getAllergyOfMenuItemThunk} from './GetAllergensOfMenuItem.thunk';

// TODO: Add this to snippets
const AddAllergenToMenuItemSlice = createSlice({
  name: 'menuItem/AddAllergenToMenuItemSlice',
  initialState,
  reducers: {
    cleanAddAllergenToMenuItemSlice: state => {
      state.data = initialState.data;
      state.message = initialState.message;
      state.isLoading = initialState.isLoading;
      state.succes = initialState.succes;
      state.error = initialState.error;
    },
  },
  extraReducers: builder => {
    //  #region
    builder.addCase(addAllergyToMenuItemThunk.rejected, (state, {payload}) => {
      state.error = payload;
      state.succes = false;

      state.isLoading = false;
    });
    builder.addCase(
      addAllergyToMenuItemThunk.fulfilled,
      (state, {payload}: PayloadAction<IAddAllergenToMenuItemRTK>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
    builder.addCase(addAllergyToMenuItemThunk.pending, (state, {payload}) => {
      state.succes = false;
      state.isLoading = true;
    });
    builder.addCase(
      getAllergyOfMenuItemThunk.fulfilled,
      (state, {payload}: PayloadAction<IAddAllergenToMenuItemRTK>) => {
        state.error = null;
        state.succes = true;
        state.data = payload.data;
        state.isLoading = false;
        state.message = payload.message;
      },
    );
  },
});

export const {cleanAddAllergenToMenuItemSlice} =
  AddAllergenToMenuItemSlice.actions;
export default AddAllergenToMenuItemSlice.reducer;
