import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../types';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import HugeMenu from '../../Pages/signedIn/menu/HugeMenu';
import HomeRecipesNavigation from '../recipes/HomeRecipesNavigation.Stack';
import HomepageHomeNavigationContainer from './Home.stack';

const HomepageNavigationContainer = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="HugeMenu2x2">
      <Stack.Screen name="HugeMenu2x2" component={HugeMenu} />
      <Stack.Screen
        name="HomePage"
        component={HomepageHomeNavigationContainer}
      />
    </Stack.Navigator>
  );
};

export default HomepageNavigationContainer;

const styles = StyleSheet.create({});
