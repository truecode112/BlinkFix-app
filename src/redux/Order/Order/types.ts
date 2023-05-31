import {IEstablishment} from './../../Profile/types';
import {IIMageRecipe, IIngredient} from './../../recipes/types';
import {IGetAddress} from '../../Profile/types';

export interface IResponsePlaceOrder<T> {
  data: T;
  error: any;
  message: string | null;
  isLoading: boolean;
  succes: boolean;
}

export interface IOrderItemMainItem {
  _id: string;
  dishName: string;
  isDishForDelivery: true;
  price: number;
  currency: string;
  dishDescription: string;
  dishIngredients: IIngredient[];
  spiceness: string;
  isVegan: boolean;
  isKosher: boolean;
  isHalal: boolean;
  category: string;
  image: IIMageRecipe;
}
interface OrderItems {
  itemId: IOrderItemMainItem;
  changes: {
    ingredientId: string;
    qtt: number;
    _id: string;
  }[];
  _id: string;
}

export interface ResponseOrder {
  _id: string;
  orderDate: string;
  orderUpdateDate: string;
  orderBy: string;
  orderWhere: string;
  orderStatus: string;
  isCompleted: boolean;
  address: IGetAddress;
  orderItems: OrderItems[];
  isWaiter?: boolean;
}

interface IReqChange {
  ingredientId: string;
  qtt: string;
}

export interface IRequestOrderItem {
  itemId: IOrderItemMainItem;
  changes: IReqChange[];
}

export interface IRequestOrder {
  orderWhere: string;
  address: IGetAddress | null;
  orderItems: IRequestOrderItem[];
  isPickup: boolean;
  isWaiter?: boolean;
}

export interface IResponseSlice<T> {
  data: T;
  error: any;
  message: string | undefined | null;
  isLoading: boolean;
  succes: boolean;
}

export interface IResponseOrderItem {
  itemId: string;
  changes: IReqChange[];
  _id: string;
}
