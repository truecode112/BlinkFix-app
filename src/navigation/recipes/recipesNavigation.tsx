import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecipesStackParamList} from '../types';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import HugeMenuRecipes from '../../Pages/signedIn/menu/HugeMenuRecipes';
import RecipesHomeNavigation from './recipesHomepageNavigation';
import {instance} from '../../redux/interceptors';

const RecipesNavigation = () => {
  const Stack = createNativeStackNavigator<RecipesStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={StackDefaultOptions}
      initialRouteName="HugeMenuRecipes2x2">
      <Stack.Screen name="HugeMenuRecipes2x2" component={HugeMenuRecipes} />
      <Stack.Screen name="Recipes Home" component={RecipesHomeNavigation} />
    </Stack.Navigator>
  );
};

export default RecipesNavigation;

const styles = StyleSheet.create({});
