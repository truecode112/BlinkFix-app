import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingCart from '../../Pages/signedIn/Order/shoppingCart';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import FoodTrucks from '../../Pages/signedIn/Order/FoodTrucks';
import LocalCooks from '../../Pages/signedIn/Order/LocalCooks';
import PaymentPage from '../../Pages/signedIn/Order/PaymentPage';
import Restaurants from '../../Pages/signedIn/Order/Restaurants';
import Shops from '../../Pages/signedIn/Order/Shops';
import {orderHomeParamList} from './types';
import FilterEstablishment from '../../Pages/signedIn/Order/FilterEstablishmentSelector';
import {useAppDispatch} from '../../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {getLikedMenuItems} from '../../redux/counters/favourites/Order/menuItems/getLikedMenuItems.thunk';

export const HomepageHomeNavigationContainer = () => {
  const Stack = createNativeStackNavigator<orderHomeParamList>();
  const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getLikedMenuItems());
    }, []),
  );
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="restaurants">
      <Stack.Screen name="shops" component={Shops} />
      <Stack.Screen name="localCooks" component={LocalCooks} />
      <Stack.Screen name="restaurants" component={Restaurants} />
      <Stack.Screen name="foodTrucks" component={FoodTrucks} />
      <Stack.Screen name="shoppingCart" component={ShoppingCart} />
      <Stack.Screen name="paymentOrderPage" component={PaymentPage} />
      <Stack.Screen
        name="filterEstablishment"
        component={FilterEstablishment}
      />
    </Stack.Navigator>
  );
};
