import {ICounter} from '../../recipes/types';

export interface IResponseGetMyEstablishmentMenus {
  error: any | undefined;
  message: string | undefined;
  data?: IGetMenuTitles[] | null;
  isLoading: boolean;
  succes: boolean;
  lastAddedId?: string | null;
}

export interface IIngredientEstablishment {
  _id: string;
  qtt: number;
  unit: string;
  name: string;
  isIngredientVisible: boolean;
  isIngredientEditable: boolean;
  pricePerIngredient: number;
}

interface IImageInterFace {
  _id: string;
  path: string;
  relatedId: string;
}

export interface IMenuItem {
  _id?: string;
  dishName: string;
  isDishForDelivery: boolean;
  price: string;
  currency: string;
  dishDescription: string;
  dishIngredients?: IIngredientEstablishment[];
  spiceness: string;
  isVegan: boolean;
  isKosher: boolean;
  isHalal: boolean;
  category: string;
  counter?: ICounter;
  image?: IImageInterFace;
  allergens: number[];
}

export interface IIsCategoryVisible {
  isVisible: boolean;
  categoryName: string;
  _id: string;
}

export interface IGetMenuTitles {
  _id: string;
  menuName: string;
  establishmentId: string;
  isOurMenuSubmenuVisible: boolean;
  menuItems: IMenuItem[] | [];
  categoryVisibility: IIsCategoryVisible[];
}
