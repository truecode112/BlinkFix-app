import React, {useCallback, useEffect} from 'react';
import LoginPage from '../../Pages/signedOut/loginPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import RegisterPage from '../../Pages/signedOut/registerPage/registerPage';
import {HomeStackParamList, RootStackParamList} from '../types';
import HugeMenu from '../../Pages/signedIn/menu/HugeMenu';

import BottomTabNavigator from '../Home/bottomTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import ForgotPasswordPage from '../../Pages/signedOut/registerPage/forgotPasswordPage';
import ResetPasswordPage from '../../Pages/signedOut/registerPage/ResetPasswordPage';
import Wallet from '../../Pages/signedIn/menupages/wallet';
import Profile from '../../Pages/signedIn/Profile/Profile';
import FAQPage from '../../Pages/signedIn/menupages/FAQ/FAQ';
import ContactPage from '../../Pages/signedIn/menupages/contact';
import LanguageSelection from '../../Pages/signedIn/menupages/LanguageSelection';
import ShoppingCart from '../../Pages/signedIn/Order/shoppingCart';
import FavouritesPage from '../../Pages/signedIn/favourites';
import StripeCreate from '../../Pages/signedIn/menupages/StripeCreate';
import CreateEstablishment from '../../Pages/signedIn/menupages/establishment/createEstablishment';
import SingleRecipe from '../../Pages/signedIn/recipes/SingleRecipe';
import PaymentPage from '../../Pages/signedIn/Order/PaymentPage';
import SingleEstablishment from '../../Pages/signedIn/Order/SingleEstablishment';
import StripeLink from '../../Pages/signedOut/registerPage/StripeLink';

const AuthNavigation = ({isAuth}: {isAuth: boolean}) => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  const Stack2 = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    // declare the data fetching function
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 3000);
  }, []);

  if (isAuth) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{...StackDefaultOptions}}
          initialRouteName="HugeMenu2x2">
          <Stack.Screen name="HugeMenu2x2" component={HugeMenu} />
          <Stack.Screen name="wallet" component={Wallet} />
          <Stack.Screen name="paymentOrderPage" component={PaymentPage} />
          <Stack.Screen name="stripeAccountcreate" component={StripeCreate} />
          <Stack.Screen
            name="createestablishment"
            component={CreateEstablishment}
          />
          <Stack.Screen name="FAQ" component={FAQPage} />
          <Stack.Screen name="contact" component={ContactPage} />
          <Stack.Screen
            name="LanguageSelection"
            component={LanguageSelection}
          />
          <Stack.Screen name="Cart" component={ShoppingCart} />
          <Stack.Screen name="HomePage" component={BottomTabNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="favourites" component={FavouritesPage} />
          <Stack.Screen
            name="favourites/establishment"
            component={SingleEstablishment}
          />

          <Stack.Screen name="favouritesRecipePage" component={SingleRecipe} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack2.Navigator screenOptions={StackDefaultOptions}>
          <Stack2.Screen name="Login" component={LoginPage} />
          <Stack2.Screen name="ForgotPassword" component={ForgotPasswordPage} />
          <Stack2.Screen name="ResetPassword" component={ResetPasswordPage} />
          <Stack2.Screen name="StripeLink" component={StripeLink} />
          <Stack2.Screen name="Register" component={RegisterPage} />
        </Stack2.Navigator>
      </NavigationContainer>
    );
  }
};

export default AuthNavigation;
