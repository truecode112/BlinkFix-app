import {IJobsGet} from './../../Profile/types';
import {IResponseSlice} from '../../Order/Order/types';

export interface IJobGetByIdData {
  //
}

export interface IJobGetById extends IResponseSlice<IJobsGet | null> {
  //
}

export const initialState: IJobGetById = {
  data: null,
  error: null,
  isLoading: false,
  message: null,
  succes: false,
  //
};
