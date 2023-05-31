import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  HomeStackParamList,
  HomeTabParamList,
  RecipesHomeStackParamList,
  RecipesStackParamList,
} from './types';

export type RootNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomePage'>,
  BottomTabNavigationProp<HomeTabParamList, 'Recipes'>
>;

export type RootNavigationWithRecipeProp = CompositeNavigationProp<
  RootNavigationProp,
  NativeStackNavigationProp<RecipesStackParamList>
>;

export type RootNavigationWithRecipeAndRecipePagesProp =
  CompositeNavigationProp<
    RootNavigationWithRecipeProp,
    NativeStackNavigationProp<RecipesHomeStackParamList>
  >;

export type ProfileRecipeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RecipesHomeStackParamList, 'Edit Recipe'>,
  NativeStackNavigationProp<HomeTabParamList, 'Profile'>
>;

export type ProfileRecipeScreenProps = NativeStackScreenProps<
  RecipesHomeStackParamList,
  'Edit Recipe'
>;
