import {
  IEstablishment,
  IGetAddress,
  ITable,
  IWokringHours,
} from './../../Profile/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTokensKeychain} from '../../../utils/localStorage';
import {instance} from '../../interceptors';
import {ICuisine} from '../../recipes/types';

export const EditEstablishmentPosition = createAsyncThunk<
  IResponseEditMyEstablishment,
  string[]
>('Establishment/position/edit}', async (state, {rejectWithValue}) => {
  try {
    const tokens = await getTokensKeychain();
    if (!state) {
      throw new Error('Location not provided');
    }

    const dataPost = [state[1], state[0]];

    const res = await instance
      .put(
        `/profile/establishment/position`,
        {location: dataPost},
        {
          headers: {Authorization: 'Bearer ' + tokens?.access_token},
        },
      )
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

export interface IResponseEditMyEstablishment {
  error: any | undefined;
  message: string | undefined;
  data?: IEstablishment | null;
  isLoading: boolean;
  succes: boolean;
}

export interface IEstablishmentEdit {
  _id: string;
  type: string;
  name: string;
  owner: string;
  location?: string[];
  cuisine: ICuisine[];
  openHours?: IWokringHours[];
  address: IGetAddress;
  isVegan: boolean;
  isHalal: boolean;
  isKosher: boolean;
  delivery: {
    isDelivery: boolean;
    isPickup: boolean;
    _id: string;
  };
  menu: [];
  assortment: [];
  tables: ITable[];
  reservations: [];
  image: [];
  counter: {
    _id: string;
    numberOfClicks: number;
    numberOfLikes: number;
    numberOfShares: number;
    whoLike: string[];
    whoShare: string[];
  }[];
  __v: 0;
}
