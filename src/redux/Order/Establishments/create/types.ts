import {IEstablishment} from './../../../Profile/types';
import {IResponseSlice} from '../../Order/types';

export type ResponseFromCreateEstablishment =
  IResponseSlice<IEstablishment | null>;
