import {IMenuItem} from './../../types';
import React from 'react';
import {IResponseSlice} from '../../../Order/Order/types';

export interface IAddAllergenToMenuItemRTK
  extends IResponseSlice<IMenuItem | null> {}

export const initialState: IAddAllergenToMenuItemRTK = {
  succes: false,
  error: null,
  isLoading: false,
  message: null,
  data: null,
};
