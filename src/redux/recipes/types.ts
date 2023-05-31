import {IEditRecipe} from './editRecipe/editRecipe.thunk';
import {IManualList} from './../../Pages/signedIn/recipes/Recipesadd';
import {ICounterRecipeFinal, IEstablishment} from '../Profile/types';

export interface IIMageRecipe {
  _id: string;
  path: string;
  relatedId: string;
}
export interface IRecipe {
  _id: string;
  image: IIMageRecipe;
  owner: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    name: string;
  };
  isEstablishment: boolean;
  title: string;
  description: string;
  cuisine: ICuisine;
  advancement: 1 | 2 | 3 | 4 | 5 | null;
  prepTime: string;
  cookTime: string;
  serves: string;
  isKosher: boolean;
  isVegan: boolean;
  isHalal: boolean;
  dishesType: string;
  ingredients: IIngredient[];
  manual: IManualList[];
  tipTitle: string;
  tipDescription: string;
  tipIngredients: IIngredient[];
  tipManual: IManualList[];
  tags: string[];
  counter: ICounterRecipeFinal;
  spiceness: 'extra hot' | 'Hot' | 'Mild' | 'normal';
}

export interface ICuisine {
  _id: string;
  code: string;
  name: string;
  oryginalName: string;
}

export function instanceOfICounter(object: any): object is IRecipe {
  return (object as IRecipe[])?.some(item => item.title !== undefined);
}

export interface ICounter {
  _id: string;
  relatedId: IRecipe | IEstablishment;
  numberOfClicks: number;
  numberOfLikes: number;
  numberOfShares: number;
  whoLike: string[];
  whoShare: string[];
}

export interface IIngredient {
  _id: string;
  qtt: number;
  pricePerIngredient: number;
  unit: string;
  name: string;
  isIngredientVisible: boolean;
  isIngredientEditable: boolean;
}

interface OwnerInterface {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
}

interface CuisineInterface {
  _id: string;
  code: string;
  name: string;
  oryginalName: string;
}

interface IngredientInterface {
  qtt: string;
  unit: string;
  name: string;
  _id: string;
}

interface ManualInterface {
  stepNumber: string;
  description: string;
  _id: string;
  image?: any;
}

interface ResponseDataAddRecipe {
  owner: OwnerInterface;
  isEstablishment: boolean;
  title: string;
  description: string;
  cuisine: CuisineInterface;
  advancement: number;
  prepTime: string;
  cookTime: string;
  serves: number;
  isKosher: boolean;
  isVegan: boolean;
  isHalal: boolean;
  dishesType: string;
  ingredients: IngredientInterface[];
  manual: ManualInterface[];
  tipTitle: string;
  tipDescription: string;
  tipIngredients: IngredientInterface[];
  tipManual: ManualInterface[];
  tags: string[];
  counter: {
    _id: string;
    numberOfClicks: number;
    numberOfLikes: number;
    numberOfShares: number;
    whoLike: any[];
    whoShare: any[];
  };
  _id: string;
}

export interface ShoppingListItem {
  isDone: boolean;
  qtt: number;
  unit: string;
  name: string;
  _id: string;
}

export interface ITimesstamps {
  createdAt: string;
  updatedAt: string;
}
export interface ShoppingListItemGet extends ITimesstamps {
  _id: string;
  owner: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    name: string;
  };
  recipeId: string;
  ingredients: ShoppingListItem[];
  tipIngredients: ShoppingListItem[];
  recipe?: IRecipe;
  image?: {
    _id: string;
    path: string;
    relatedId: string;
  };
}

export interface ResponseDataAddShoppingList {
  owner: string;
  recipeId: string;
  ingredients: ShoppingListItem[];
  tipIngredients: ShoppingListItem[];
  recipe: IRecipe[];
  _id: string;
}

export interface IResponseAddRecipe {
  error: any | undefined;
  message: string | undefined;
  data?: IRecipe | null;
  isLoading: boolean;
  succes: boolean;
  lastRecipeAdded?: string;
}

export interface IResponseEditRecipe {
  error: any | undefined;
  message: string | undefined;
  data?: IEditRecipe | null;
  isLoading: boolean;
  succes: boolean;
  lastRecipeAdded?: string;
}
export interface IResponseGetMyRecipes {
  error: any | undefined;
  message: string | undefined;
  data: IRecipe[] | null;
  isLoading: boolean;
  succes: boolean;
}
export interface IResponseAddShoppingList {
  data?: {shoppingList: ShoppingListItemGet; recipe?: IRecipe}[] | null;
  error: any | undefined;
  message: string | undefined;
  isLoading: boolean;
  succes: boolean;
}
export interface IResponseGetShoppingLists {
  data?: {shoppingList: ShoppingListItemGet; recipe?: IRecipe}[] | null;
  error: any | undefined;
  message: string | undefined;
  isLoading: boolean;
  succes: boolean;
}
export interface IResponseGetSingleShoppingList {
  data?: {shoppingList: ShoppingListItemGet; recipe?: IRecipe} | null;
  error: any | undefined;
  message: string | undefined;
  isLoading: boolean;
  succes: boolean;
}
