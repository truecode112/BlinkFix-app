import {
  IEstablishmentOrderData,
  IOrderListItem,
} from '../Order/EstablishmentOrder/EstablishmentOrder.types';
import {ICounter, IIMageRecipe, IRecipe} from '../recipes/types';
import {IIngredientEstablishment} from './establishmentMenus/types';

export interface IResponseGetMyProfile {
  error: any | undefined;
  message: string | undefined;
  data?: IGetProfileInfo | null;
  isLoading: boolean;
  succes: boolean;
}

export interface IAllergy {
  _id: string;
  ownerId: string;
  allergies?: string[];
}

export interface IGetProfileInfo {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  phone_number: string;
  address: IGetAddress[];
  birth_year: string;
  userRole:
    | 'End User'
    | 'Student'
    | 'Local Cook'
    | 'Restaurant'
    | 'Food trucks'
    | 'Shop';
  documentImages: IGetDocumentImages[];
  jobs?: IJobsGet[];
  images?: IGetImages[];
  allergies?: IAllergy;
  establishment?: IEstablishment[];
  stripe_id?: string;
}

export interface IGetImages {
  fieldname: string;
  originalname: string;
  encoding: any;
  mimetype: string;
  path: string;
  image?: {
    ownerId: string;
    path: string;
    isImageBackground: boolean;
    _id: string;
  };
}
export interface IGetDocumentImages {
  _id: string;
  path: string;
  ownerId: string;
  isFrontImage: boolean;
}

export interface IGetAddress {
  _id?: string;
  country: string;
  city: string;
  street: string;
  postcode: string;
  state: string;
  buildingnumber: string;
}

export interface IJobsGet {
  _id: string;
  typeOfWork: IJobTitle;

  workerId?: IGetProfileInfo;
  workPlace: IEstablishment;
  startOfWork?: string;
  endOfWork?: string;
  isConfirmed?: boolean;
  orders?: IOrderListItem[];
}

export interface IJobWorkPlace {
  type: string;
  name: string;
  _id: string;
}

export type IJobTitle = 'waiter' | 'chef' | 'driver' | '';

interface ICuisine {
  _id: string;
  code: string;
  name: string;
  oryginalName: string;
}

export interface IWokringHours {
  hours: {
    open: string;
    close: string;
  };
  day: string;
  _id: string;
}

export interface ILocation {
  type: string;
  coordinates: string[];
  _id?: string;
}

export interface ITable {
  _id?: string;
  tableName: string;
  tableShape: string;
  numberOfPlaces: string;
  numberOfTables: string;
  numberOfTablesAvailable?: string;
}

export interface ICategoryVisibility {
  categoryName: string;
  isVisible: boolean;
  _id: string;
}

export interface IIngredient {
  _id: string;
  qtt: number;
  unit: string;
  name: string;
  isIngredientVisible: boolean;
  isIngredientEditable: boolean;
  pricePerIngredient: number;
}

export interface IMenuItem {
  _id: string;
  dishName: string;
  isDishForDelivery: boolean;
  price: string;
  currency: string;
  dishDescription: string;
  dishIngredients: IIngredientEstablishment[];
  spiceness: string;
  isVegan: boolean;
  isKosher: boolean;
  isHalal: boolean;
  category: string;
  image?: IIMageRecipe;
  counter: ICounterEstablishmentFinal;
  allergens: number[];
  establishmentId: string;
}

export interface IMenu {
  _id: string;
  menuName: string;
  establishmentId: string;
  isOurMenuSubmenuVisible: false;
  menuItems: IMenuItem[];
  categoryVisibility: ICategoryVisibility[];
}

export interface IEstablishment {
  _id: string;
  type: string;
  name: string;
  owner?: IGetProfileInfo;
  location?: ILocation;
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
  menu?: IMenu[];
  assortment: [];
  tables: ITable[];
  reservations: [];
  image: [];
  counter: ICounterEstablishmentFinal;
  taxPercentage?: number;
}

export interface ICounterEstablishmentFinal {
  _id: string;
  relatedId: IEstablishment;
  numberOfClicks: number;
  numberOfLikes: number;
  numberOfShares: number;
  whoLike: string[];
  whoShare: string[];
}
export interface ICounterRecipeFinal {
  _id: string;
  relatedId: IRecipe;
  numberOfClicks: number;
  numberOfLikes: number;
  numberOfShares: number;
  whoLike: string[];
  whoShare: string[];
}
