import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RecipesHomeStackParamList} from '../types';
import Recipesmy from '../../Pages/signedIn/recipes/Recipesmy';
import {StackDefaultOptions} from '../../options/stackDefaultOptions';
import Recipesadd from '../../Pages/signedIn/recipes/Recipesadd';
import RecipesFind from '../../Pages/signedIn/recipes/Recipesfind';
import SingleRecipe from '../../Pages/signedIn/recipes/SingleRecipe';
import SingleShoppingListEdit from '../../Pages/signedIn/recipes/SingleShoppingListEdit';
import RecipeAddToShoppingList from '../../Pages/signedIn/recipes/recipeAddToShoppingList';
import RecipesShoppinglists from '../../Pages/signedIn/recipes/ShoppingList';
import EditRecipes from '../../Pages/signedIn/recipes/EditRecipePage';
import AddShoppingListClearPage from '../../Pages/signedIn/recipes/AddShoppingListClearPage';

export type IRecipeEdit = NativeStackNavigationProp<
  RecipesHomeStackParamList,
  'Edit Recipe'
>;
const HomeRecipesNavigation = () => {
  const Stack = createNativeStackNavigator<RecipesHomeStackParamList>();

  return (
    <Stack.Navigator screenOptions={StackDefaultOptions}>
      <Stack.Screen name="My Recipes" component={Recipesmy} />
      <Stack.Screen name="Add Recipes" component={Recipesadd} />
      <Stack.Screen name="Edit Recipe" component={EditRecipes} />
      <Stack.Screen name="Find Recipes" component={RecipesFind} />
      <Stack.Screen name="Single Recipe" component={SingleRecipe} />
      <Stack.Screen
        name="AddShoppingListClear"
        component={AddShoppingListClearPage}
      />
      <Stack.Screen
        name="Add Shopping Lists"
        component={RecipeAddToShoppingList}
      />
      <Stack.Screen
        name="SingleShoppingListEdit"
        component={SingleShoppingListEdit}
      />
      <Stack.Screen name="Shopping Lists" component={RecipesShoppinglists} />
    </Stack.Navigator>
  );
};

export default HomeRecipesNavigation;

const styles = StyleSheet.create({});
