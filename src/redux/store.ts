import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authSlice from './rootReducer';
import loginSlice from './Auth/loginReducer';
import registerSlice from './Auth/registerReducer';
import registerStripeSlice from './Auth/registerStripeReducer';
import registerStripeLink from './Auth/AuthStripeLink.slice';
import recipesSlice from './recipes';
import recipesByTagSlice from './recipes/searchByTag';
import addRecipeSlice from './recipes/addRecipe/addRecipe';
import editRecipeSlice from './recipes/editRecipe/editRecipe.slice';
import myRecipesSlice from './recipes/myRecipes/myRecipes.slice';
import AppSetupSlice from './App/setup.slice';
import EstablishmentSlice from './Order/Establishment.slice';
import EmployeesListSlice from './Order/tables/employees/GetEmployeeList.slice';
import EmployeesAcceptSlice from './Order/tables/employees/establishmentEmployees.slice';
import MyEstabishmentMenus from './Profile/establishmentMenus/EstablishmentMenu.slice';
import ShoppingListSlice from './recipes/shoppingList/shoppinList.slice';
import MyEstablishmentSlice from './Order/MyEstablishment/editEsablishment.slice';
import FindNerbayEstablishmentSlice from './Order/Establishments/getNerbayEstablishments.slice';
import PurchasesSlice from './Order/Purchases/index.slice';
import forgotSlice from './Auth/resetPasswordReducer';
import MyFavouritesRecipesSlice from './counters/favourites/Favourites.slice';

import getProfileSlice from './Profile/profileCore.slice';
import {ShoppingCartSlice} from './Order/shoppingCart.slice';
import StripeAccountSlice from './Order/Order/stripe/CreateStripeAccount.slice';
import recipesInvoicesSlice from './Profile/invoices/recipesInvoices.slice';
import MyWalletSlice from './Profile/wallet/walet.slice';
import CreateEstablishmentSclice from './Order/Establishments/create/createEstablishment.slice';
import shoppingListSclice from './recipes/shoppingList/addShoppingListClear.slice';
import EditShoppingListThunkSlice from './recipes/shoppingList/updateShoppingList.slice';
import LocationByAddress from './Order/Establishments/getLocationByAddress.thunk';

import LikedEstablishments from './counters/favourites/Order/liked';
import MyAllergiesSlice from './Profile/allergies/allergies.slice';
import AddAllergensToMenuItem from './Profile/allergies/AddAllergenToMenuItem/AddAllergenToMenuItem.slice';
import MyFavouritesMenuItemSlice from './counters/favourites/Order/menuItems/addMenuItemLike.slice';
import GetMyFavouritesMenuItems from './counters/favourites/Order/menuItems/getLikedMenuItems.slice';
import EstablishmentOrderSlice from './Order/EstablishmentOrder/EstablishmentOrder.slice';
import JobGetByIdSlice from './Jobs/JobGetById/JobGetById.slice';
import WaiterOrderSlice from './Jobs/Waiter/WaiterOrder.slice';
import ForwardedToJobTypeSlice from './Profile/Jobs/ForwardedToJobType/ForwardedToJobType.slice';
import ForwardToJobTypeSlice from './Profile/Jobs/ForwardToJobType/ForwardToJobType.slice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [
    'auth',
    'login',
    'register',
    'recipes',
    'recipesByTag',
    'addRecipe',
    'editRecipe',
    'myRecipes',
    'profile',
    'establishment',
    'employees',
    'employeesAccept',
    'MyEstabishmentMenus',
    'shoppingList',
    'findNerbayEstablishment',
    'MyEstablishment',
    'Purchases',
    'recipesInvoices',
    'wallet',
    'StripeAccountSlice',
    'CreateEstablishmentSclice',
    'MyFavouritesRecipesSlice',
    'shoppingListSclice',
    'LocationByAddress',
    'LikedEstablishments',
    'AddAllergensToMenuItem',
    'MyFavouritesMenuItems',
    'registerStripeLink',
    'EstablishmentOrder',
    'JobGetById',
    'WaiterOrder',
    'ForwardedOrderToJobType',
    'ForwardToJobType',
  ], //blacklisting a store attribute name, will not persist that store attribute.
};

const rootReducer = combineReducers({
  App: AppSetupSlice,
  auth: authSlice,
  forgot: forgotSlice,
  login: loginSlice,
  register: registerSlice,
  stripe: registerStripeSlice,
  recipes: recipesSlice,
  recipesByTag: recipesByTagSlice,
  addRecipe: addRecipeSlice,
  editRecipe: editRecipeSlice,
  myRecipes: myRecipesSlice,
  profile: getProfileSlice,
  establishment: EstablishmentSlice,
  employees: EmployeesListSlice,
  employeesAccept: EmployeesAcceptSlice,
  MyEstabishmentMenus: MyEstabishmentMenus,
  shoppingList: ShoppingListSlice,
  findNerbayEstablishment: FindNerbayEstablishmentSlice,
  MyEstablishment: MyEstablishmentSlice,
  ShoppingCart: ShoppingCartSlice.reducer,
  Purchases: PurchasesSlice,
  recipesInvoices: recipesInvoicesSlice,
  wallet: MyWalletSlice,
  stripeAccount: StripeAccountSlice,
  CreateEstablishment: CreateEstablishmentSclice,
  MyFavouritesRecipes: MyFavouritesRecipesSlice,
  shoppingListClear: shoppingListSclice,
  editShoppingList: EditShoppingListThunkSlice, //
  LocationByAddress: LocationByAddress,
  LikedEstablishments: LikedEstablishments,
  allergiesState: MyAllergiesSlice,
  AddAllergensToMenuItem: AddAllergensToMenuItem,
  MyFavouritesMenuItems: MyFavouritesMenuItemSlice,
  GetMyFavouritesMenuItems: GetMyFavouritesMenuItems,
  registerStripeLink: registerStripeLink,
  EstablishmentOrder: EstablishmentOrderSlice,
  JobGetById: JobGetByIdSlice,
  WaiterOrder: WaiterOrderSlice,
  ForwardedOrderToJobType: ForwardedToJobTypeSlice,
  ForwardToJobType: ForwardToJobTypeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
