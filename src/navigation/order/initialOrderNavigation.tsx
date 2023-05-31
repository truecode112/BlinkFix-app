import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import OrderMenu from '../../Pages/signedIn/Order';
import ModalAddMenuItem from '../../Pages/signedIn/Order/ModalAddMenuItem';
import SingleEstablishment from '../../Pages/signedIn/Order/SingleEstablishment';
import {HomepageHomeNavigationContainer} from './orderNavigation';
import {orderInitialParamList} from './types';

export const HomepageHomeMenuNavigationContainer = () => {
  const Stack = createNativeStackNavigator<orderInitialParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="OrderPageMenu">
      <Stack.Screen
        name="OrderPage"
        component={HomepageHomeNavigationContainer}
      />
      <Stack.Screen
        name="SingleRestaurantPage"
        component={SingleEstablishment}
      />
      <Stack.Screen name="MenuItemAddModal" component={ModalAddMenuItem} />
      <Stack.Screen name="OrderPageMenu" component={OrderMenu} />
    </Stack.Navigator>
  );
};
