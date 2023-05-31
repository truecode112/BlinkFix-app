import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {IInvoiceRecipe} from './recipesInvoices.slice';

export const getInvoicesRecipesThunk = createAsyncThunk<IInvoiceRecipe[]>(
  'profile/invoices/recipes',
  async (_, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .get(`/profile/invoices/recipes`, {
          headers: {
            Authorization: 'Bearer ' + tokens?.access_token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return rejectWithValue(error.response.data.message);
        });

      return res;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);

export const addNewTransactionThunk = createAsyncThunk<IInvoiceRecipe[]>(
  'profile/invoices/recipes',
  async (_, {rejectWithValue}) => {
    try {
      const tokens = await getTokensKeychain();

      const res = await instance
        .get(`/profile/invoices/recipes`, {
          headers: {
            Authorization: 'Bearer ' + tokens?.access_token,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return rejectWithValue(error.response.data.message);
        });

      return res;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        error: 'login failed',
        data: null,
      });
    }
  },
);
