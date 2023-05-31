import {IOrderListItem} from './../../redux/Order/EstablishmentOrder/EstablishmentOrder.types';
import {
  IEstablishment,
  IJobsGet,
  IJobTitle,
  IMenu,
} from './../../redux/Profile/types';
import {
  IRecipe,
  ShoppingListItemGet,
  IIngredient,
} from './../../redux/recipes/types';
import {IMenuItem} from './../../redux/Profile/establishmentMenus/types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {IWorkspaceEmployeeList} from '../../redux/Order/tables/employees/GetEmployeeList.thunk';
import {IInvoice} from '../../redux/Order/Purchases/getMyPurchases.thunk';
import {ICartItemItem} from '../../redux/Order/shoppingCart.slice';

export type ProfileParamList = {
  SingleEmployee: {employee: IWorkspaceEmployeeList};
  ProfileHome: undefined;
  createestablishment: undefined;
  AddMenuItem: {menuId: string};
  EditMenuItem: {menuId: string; item: IMenuItem};
  AddRecipeFromProfile: {from?: 'Profile' | 'Recipe'};
  EditRecipeFromProfile: {recipeGet: IRecipe};
  SingleRecipeFromProfile: {recipe: IRecipe; from: 'Profile' | 'Recipe'};
  ShoppingListsFromProfile: {from: 'Profile' | 'Recipe'};
  AddShoppingListFromProfile: {
    recipeId: string;
    ingredientsList: IIngredient[];
    tipIngredientsList: IIngredient[];
    from: 'Profile' | 'Recipe';
  };
  SingleShoppingListFromProfile: {
    list: ShoppingListItemGet;
  };
  SingleInvoiceFromProfile: {
    invoice: IInvoice;
  };
  AddAllergens: {
    menuItemId: string;
  };
  Workspace: {
    screen: IJobTitle;
    jobId: string;
  };
  WorkspaceWaiterMenu: {
    establishment: IEstablishment;
  };
  WorkspaceInfo: {
    job: IJobsGet;
  };
  WaiterMenuItemAddModal: {
    menuItem: IMenuItem;
    bestSellers?: IMenuItem[];
    establishmentId: string;
    establishment: IEstablishment;
    isWaiter?: boolean;
  };
  WaiterListOfOrders: {
    listOfOrders: {
      orderWhere: string;
      orderItems: ICartItemItem;
      establishment: IEstablishment;
    }[];
  };
  ChefsActiveOrders: {
    activeOrders: IOrderListItem[];
    jobId: string;
  };
};

export type ProfileNavigation = StackNavigationProp<
  ProfileParamList,
  'ProfileHome'
>;

export type WorkspaceProps = StackScreenProps<ProfileParamList, 'Workspace'>;
export type ChefsActiveOrdersProps = StackScreenProps<
  ProfileParamList,
  'ChefsActiveOrders'
>;
export type WaiterListOfOrdersProps = StackScreenProps<
  ProfileParamList,
  'WaiterListOfOrders'
>;
export type WorkspaceWaiterMenuProps = StackScreenProps<
  ProfileParamList,
  'WorkspaceWaiterMenu'
>;
export type WorkspaceInfoProps = StackScreenProps<
  ProfileParamList,
  'WorkspaceInfo'
>;

export type ProfileNavigationProps = StackScreenProps<
  ProfileParamList,
  'SingleEmployee'
>;
export type ProfileAddRecipeNavigationProps = StackScreenProps<
  ProfileParamList,
  'AddRecipeFromProfile'
>;
export type ProfileSingleInvoiceProps = StackScreenProps<
  ProfileParamList,
  'SingleInvoiceFromProfile'
>;

export type ProfileSingleRecipeNavigationProps = StackScreenProps<
  ProfileParamList,
  'SingleRecipeFromProfile'
>;

export type ProfileEditRecipeNavigationProps = StackScreenProps<
  ProfileParamList,
  'EditRecipeFromProfile'
>;

export type ProfileNavigationAddMenuItems = StackNavigationProp<
  ProfileParamList,
  'SingleEmployee'
>;

export type ProfileNavigationPropsAddMenuItems = StackScreenProps<
  ProfileParamList,
  'AddMenuItem'
>;

export type ProfileNavigationPropsEditMenuItems = StackScreenProps<
  ProfileParamList,
  'EditMenuItem'
>;

export type SingleShoppingListScreenParam = StackScreenProps<
  ProfileParamList,
  'SingleShoppingListFromProfile'
>;
export type ShoppingListAddScreenParam = StackScreenProps<
  ProfileParamList,
  'AddShoppingListFromProfile'
>;
export type ShoppingListsFromProfileScreenParam = StackScreenProps<
  ProfileParamList,
  'ShoppingListsFromProfile'
>;
