import {IGetAddress} from './../../redux/Profile/types';
import {
  NavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {ICartItemItem} from '../../redux/Order/shoppingCart.slice';
import {IEstablishment, IMenuItem} from '../../redux/Profile/types';
export type orderHomeParamList = {
  restaurants: undefined;
  shops: undefined;
  foodTrucks: undefined;
  localCooks: undefined;
  shoppingCart: undefined;
  paymentOrderPage: {
    items: ICartItemItem[];
    orderWhere: string;
    address: IGetAddress | null;
    total: number;
  };
  filterEstablishment: undefined;
};

export type orderInitialParamList = {
  OrderPage: NavigatorScreenParams<orderHomeParamList>;
  OrderPageMenu: undefined;
  SingleRestaurantPage: {
    establishment: IEstablishment;
  };
  MenuItemAddModal: {
    menuItem: IMenuItem;
    bestSellers?: IMenuItem[];
    establishmentId: string;
    establishment: IEstablishment;
    isWaiter?: boolean;
  };
};

export type ISingleEstablishmentProps = StackScreenProps<
  orderInitialParamList,
  'SingleRestaurantPage'
>;
export type ISingleEstablishmentNavigationProps = NavigationProp<
  orderInitialParamList,
  'SingleRestaurantPage'
>;

export type MenuOrderNavigation = StackNavigationProp<
  orderInitialParamList,
  'OrderPage'
>;

export type IMenuItemAddModalProps = StackScreenProps<
  orderInitialParamList,
  'MenuItemAddModal'
>;
export type IMenuItemAddModalRoute = RouteProp<
  orderInitialParamList,
  'MenuItemAddModal'
>;

export type IMenuItemAddModalNavigation = StackNavigationProp<
  orderInitialParamList,
  'MenuItemAddModal'
>;

export type IPaymentPageStackProps = RouteProp<
  orderHomeParamList,
  'paymentOrderPage'
>;

export type IOrderNavigation = StackNavigationProp<
  orderHomeParamList,
  'paymentOrderPage'
>;
