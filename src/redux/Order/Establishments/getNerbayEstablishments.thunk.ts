import {checkStringNull} from './../../recipes/editRecipe/functions';
import {IEstablishment} from './../../Profile/types';
import {getTokensKeychain} from './../../../utils/localStorage/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {instance} from '../../interceptors';

export interface FilterInterface {
  city?: string;
  country?: string;
  cuisine?: string;
  buildingnumber?: string;
  postcode?: string;
  street?: string;
  isHalal?: boolean;
  isVegan?: boolean;
  isKosher?: boolean;
  type?: string;
  lat?: string;
  lang?: string;
  distance?: string;
}
export const GetNerbayEstablishment = createAsyncThunk<
  IResponseGetNerbayEstablishment,
  FilterInterface | undefined
>('Establishment/get/nerbay}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    let params = constructParamsString(state);
    const res = await instance
      .get(`/order/establishment/find?${params}`, {
        headers: {Authorization: 'Bearer ' + tokens?.access_token},
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
});

export interface IResponseGetNerbayEstablishment {
  error: any | undefined;
  message: string | undefined;
  data?: IEstablishment[] | null;
  isLoading: boolean;
  succes: boolean;
}

const constructParamsString = (params: FilterInterface | undefined): string => {
  if (params === undefined) return '';
  let paramsString = '';
  if (params) {
    if (checkStringNullOrUndefined(params.type))
      paramsString += 'type=' + params.type + '&';
    if (checkStringNullOrUndefined(params.distance))
      paramsString += 'distance=' + params.distance + '&';
    if (checkStringNullOrUndefined(params.buildingnumber))
      paramsString += 'buildingnumber=' + params.buildingnumber + '&';
    if (checkStringNullOrUndefined(params.city))
      paramsString += 'city=' + params.city + '&';
    if (checkStringNullOrUndefined(params.country))
      paramsString += 'country=' + params.country + '&';
    if (checkStringNullOrUndefined(params.cuisine))
      paramsString += 'cuisine=' + params.cuisine + '&';
    if (checkStringNullOrUndefined(params.lang))
      paramsString += 'long=' + params.lang + '&';
    if (checkStringNullOrUndefined(params.lat))
      paramsString += 'lat=' + params.lat + '&';
    if (checkStringNullOrUndefined(params.postcode))
      paramsString += 'postcode=' + params.postcode + '&';
    if (checkStringNullOrUndefined(params.street))
      paramsString += 'street=' + params.street + '&';
    if (typeof params.isHalal === 'boolean' && params.isHalal === true)
      paramsString += 'isHalal=' + params.isHalal + '&';
    if (typeof params.isKosher === 'boolean' && params.isKosher === true)
      paramsString += 'isKosher=' + params.isKosher + '&';
    if (typeof params.isVegan === 'boolean' && params.isVegan === true)
      paramsString += 'isVegan=' + params.isVegan + '&';
  }

  return paramsString;
};

const checkStringNullOrUndefined = (string: string | null | undefined) => {
  if (typeof string === 'string') return true;
  else return false;
};
